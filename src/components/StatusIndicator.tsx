import type { ReactNode } from 'react';

export interface StatusIndicatorProps {
  isSearching: boolean; // Estado interno a exponer a la función hija
  children: (isSearching: boolean) => ReactNode; // Contenido dependiente del estado mediante función
}

export function StatusIndicator({ isSearching, children }: StatusIndicatorProps) {
    return (
        <div className="status-indicator-wrapper">
            {children(isSearching)}
        </div>
    );
}