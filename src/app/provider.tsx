// app/providers.tsx
"use client";

import { Provider } from "react-redux";
import { persistor, store } from './redux/store';
 
import { Toaster, toast } from 'sonner'
import { PersistGate } from "redux-persist/integration/react";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    <Toaster />
    </Provider>;
}
