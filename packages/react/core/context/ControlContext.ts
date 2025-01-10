import { createContext } from 'react';

export const ControlContext = createContext<string | null>(null);
ControlContext.displayName = 'ControlIdContext';
