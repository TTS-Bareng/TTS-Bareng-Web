import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Apple, Play } from 'lucide-react';

interface ToastData {
  id: number;
  title: string;
  message: string;
  type?: 'apple' | 'google' | 'info';
}

interface ToastContextType {
  showToast: (title: string, message: string, type?: 'apple' | 'google' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback((title: string, message: string, type: 'apple' | 'google' | 'info' = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev.slice(-2), { id, title, message, type }]); // Keep max 3 toasts

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none px-4 w-full max-w-md">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 24, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.92 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="pointer-events-auto w-full p-4 rounded-2xl liquid-glass border border-black/[0.08] shadow-2xl flex items-center justify-between gap-3 text-surface-950"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-surface-900 text-white flex items-center justify-center shrink-0 shadow-sm">
                  {toast.type === 'apple' ? (
                    <Apple className="w-5 h-5 fill-current" />
                  ) : toast.type === 'google' ? (
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  ) : (
                    <Sparkles className="w-5 h-5 text-amber-300" />
                  )}
                </div>
                <div>
                  <div className="font-semibold text-sm tracking-tight text-surface-950 flex items-center gap-1.5">
                    <span>{toast.title}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-50 text-brand-600 border border-brand-200/50">
                      Coming Soon
                    </span>
                  </div>
                  <div className="text-xs text-surface-600 font-normal mt-0.5">
                    {toast.message}
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-surface-400 hover:text-surface-700 hover:bg-black/[0.04] transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
