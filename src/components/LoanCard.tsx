import type { LoanRequest } from '../types/loan';
import './LoanCard.css';

// Interfaz de Props con contrato explícito
export interface LoanCardProps {
    request: LoanRequest;                            
    variant?: 'normal' | 'compact';                  
    isMarkedForReview?: boolean;                     
    onToggleReview: (requestId: string) => void;     
}

export function LoanCard({
    request,
    variant = 'normal',                              
    isMarkedForReview = false,                       
    onToggleReview,
    }: LoanCardProps) {
    const { id, resourceName, category, applicantName, requestDate, returnDate, status } = request;

    const statusClass = status.toLowerCase().replace(/\s+/g, '-');
    const cardClassName = `loan-card loan-card--${variant} ${isMarkedForReview ? 'loan-card--marked' : ''}`;

    return (
        <article className={cardClassName}>
        <header className="loan-card__header">
            <span className="loan-card__id">{id}</span>
            <span className={`loan-card__badge loan-card__badge--${statusClass}`}>
            {status}
            </span>
        </header>

        <div className="loan-card__body">
            <h3 className="loan-card__title">{resourceName}</h3>
            <p className="loan-card__meta">
            <strong>Categoría:</strong> {category}
            </p>
            <p className="loan-card__meta">
            <strong>Solicitante:</strong> {applicantName}
            </p>
            <p className="loan-card__meta">
            <strong>Fecha solicitud:</strong> {requestDate}
            </p>
            <p className="loan-card__meta">
            <strong>Fecha devolución:</strong>{' '}
            {returnDate ? returnDate : <em className="text-muted">Sin fecha confirmada</em>}
            </p>
        </div>

        <footer className="loan-card__footer">
            <button
            type="button"
            className={`loan-card__action-btn ${isMarkedForReview ? 'btn-active' : ''}`}
            onClick={() => onToggleReview(id)}
            >
            {isMarkedForReview ? '✓ Marcado para revisión' : 'Marcar para revisión'}
            </button>
        </footer>
        </article>
    );
    }