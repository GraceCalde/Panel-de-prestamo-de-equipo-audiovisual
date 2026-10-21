import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { LoanStatus, SearchCriteria } from '../types/loan';
import './SearchForm.css';

export interface SearchFormProps {
    onSearch: (criteria: SearchCriteria) => void; 
    isSearching?: boolean;
}

export function SearchForm({ onSearch, isSearching = false }: SearchFormProps) {
    const [query, setQuery] = useState<string>('');
    const [status, setStatus] = useState<LoanStatus | 'Todos'>('Todos');

  // Evento tipado para cambio en el campo de texto
    const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    };

  // Evento tipado para cambio en el menú de selección
        const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as LoanStatus | 'Todos');
    };

  // Evento tipado para el envío del formulario
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Previene la recarga del navegador
    onSearch({ query: query.trim(), status });
    };

  // Limpieza de filtros
    const handleReset = () => {
    setQuery('');
    setStatus('Todos');
    onSearch({ query: '', status: 'Todos' });
    };

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <div className="search-form__field">
                <label htmlFor="search-query" className="search-form__label">
                Buscar (Recurso / Solicitante)
                </label>
        <input
            id="search-query"
            type="text"
            className="search-form__input"
            placeholder="Ej. Cámara, Ana..."
            value={query}
            onChange={handleQueryChange}
        />
            </div>

        <div className="search-form__field">
        <label htmlFor="search-status" className="search-form__label">
            Filtrar por Estado
        </label>
        <select
            id="search-status"
            className="search-form__select"
            value={status}
            onChange={handleStatusChange}
            >
            <option value="Todos">Todos los estados</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Aprobado">Aprobado</option>
            <option value="Rechazado">Rechazado</option>
            <option value="En Préstamo">En Préstamo</option>
        </select>
        </div>

        <div className="search-form__actions">
        <button
            type="submit"
            className="search-form__btn search-form__btn--primary"
            disabled={isSearching}
        >
            {isSearching ? 'Buscando...' : 'Buscar'}
        </button>
        <button
            type="button"
            className="search-form__btn search-form__btn--secondary"
            onClick={handleReset}
            disabled={isSearching}
        >
            Limpiar
        </button>
        </div>
    </form>
    );
}