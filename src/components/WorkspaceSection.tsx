import type { ReactNode } from 'react';
import './WorkspaceSection.css';

export interface WorkspaceSectionProps {
    title: string;
    description?: string;
    children: ReactNode; 
}

export function WorkspaceSection({ title, description, children }: WorkspaceSectionProps) {
    return (
    <section className="workspace-section">
        <header className="workspace-section__header">
        <h2 className="workspace-section__title">{title}</h2>
            {description && <p className="workspace-section__description">{description}</p>}
        </header>
        <div className="workspace-section__content">
            {children}
        </div>
    </section>
    );
}