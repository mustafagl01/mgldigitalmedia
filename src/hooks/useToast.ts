import { useState, useEffect } from 'react';

const TOAST_LIMIT = 1;
let count = 0;

function generateId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
}

interface Toast extends ToastProps {
  id: string;
  dismiss: () => void;
}

const toastStore = {
  state: { toasts: [] as Toast[] },
  listeners: [] as Array<(state: { toasts: Toast[] }) => void>,
  getState: () => toastStore.state,
  setState: (nextState: any) => {
    toastStore.state = typeof nextState === 'function' ? nextState(toastStore.state) : { ...toastStore.state, ...nextState };
    toastStore.listeners.forEach(listener => listener(toastStore.state));
  },
  subscribe: (listener: (state: { toasts: Toast[] }) => void) => {
    toastStore.listeners.push(listener);
    return () => {
      toastStore.listeners = toastStore.listeners.filter(l => l !== listener);
    };
  }
};

export const toast = ({ ...props }: ToastProps) => {
  const id = generateId();
  const dismiss = () => toastStore.setState((state: any) => ({ 
    ...state, 
    toasts: state.toasts.filter((t: Toast) => t.id !== id) 
  }));
  
  toastStore.setState((state: any) => ({ 
    ...state, 
    toasts: [{ ...props, id, dismiss }, ...state.toasts].slice(0, TOAST_LIMIT) 
  }));
  
  return { id, dismiss };
};

export function useToast() {
  const [state, setState] = useState(toastStore.getState());
  
  useEffect(() => {
    const unsubscribe = toastStore.subscribe(setState);
    return unsubscribe;
  }, []);
  
  useEffect(() => {
    const timeouts = state.toasts.map((toast) => {
      if (toast.duration === Infinity) return;
      return setTimeout(() => toast.dismiss(), toast.duration || 5000);
    });
    return () => timeouts.forEach((timeout) => timeout && clearTimeout(timeout));
  }, [state.toasts]);
  
  return { toast, toasts: state.toasts };
}