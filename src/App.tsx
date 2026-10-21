import { useState } from 'react';
import type { LoanRequest, SearchCriteria } from './types/loan';
import { initialLoanRequests } from './data/mockLoans';
import { WorkspaceSection } from './components/WorkspaceSection';
import { StatusIndicator } from './components/StatusIndicator';
import { SearchForm } from './components/SearchForm';
import { LoanCard } from './components/LoanCard';
import './App.css';

export function App() {
  // Estado local para los datos y la interacción
  const [allRequests] = useState<LoanRequest[]>(initialLoanRequests);
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
    query: '',
    status: 'Todos',
  });
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [markedForReviewIds, setMarkedForReviewIds] = useState<string[]>([]);

  // Manejo del callback de búsqueda transmitido por SearchForm
  const handleSearch = (criteria: SearchCriteria) => {
    setIsSearching(true);
    setSearchCriteria(criteria);

    // Transición observable para simular la búsqueda y actualizar el StatusIndicator
    setTimeout(() => {
      setIsSearching(false);
    }, 400);
  };

  // Callback tipado para alternar la marca de revisión sin mutar la solicitud
  const handleToggleReview = (requestId: string) => {
    setMarkedForReviewIds((prevIds) => {
      if (prevIds.includes(requestId)) {
        return prevIds.filter((id) => id !== requestId); // Desmarca si ya existía
      } else {
        return [...prevIds, requestId]; // Agrega a la colección
      }
    });
  };

  // Filtrado reactivo derivado del estado
  const filteredRequests = allRequests.filter((request) => {
    const matchesQuery =
      criteriaMatches(request.resourceName, searchCriteria.query) ||
      criteriaMatches(request.applicantName, searchCriteria.query);

    const matchesStatus =
      searchCriteria.status === 'Todos' || request.status === searchCriteria.status;

    return matchesQuery && matchesStatus;
  });

  return (
    <div className="app-container">
      <header className="main-header">
        <h1>MediaDesk</h1>
        <p>Panel de préstamo de equipo audiovisual</p>
      </header>

      <main>
        {/* Seccion 1: Marco para el formulario de filtro y el indicador de estado */}
        <WorkspaceSection
          title="Filtros de Búsqueda"
          description="Consulte las solicitudes por nombre de recurso, solicitante o estado"
        >
          <SearchForm onSearch={handleSearch} isSearching={isSearching} />

          <div style={{ marginTop: '1rem' }}>
            <StatusIndicator isSearching={isSearching}>
              {(searching) =>
                searching ? (
                  <div className="status-banner status-banner--loading">
                      Procesando consulta de solicitudes...
                  </div>
                ) : (
                  <div className="status-banner status-banner--ready">
                      Resultados actualizados. Coincidencias encontradas: <strong>{filteredRequests.length}</strong>
                  </div>
                )
              }
            </StatusIndicator>
          </div>
        </WorkspaceSection>

        {/* Seccion 2: Marco para la lista de resultados y tarjetas */}
        <WorkspaceSection
          title="Solicitudes Registradas"
          description={`Mostrando ${filteredRequests.length} de ${allRequests.length} solicitudes en total`}
        >
          {filteredRequests.length > 0 ? (
            <div className="loan-cards-grid">
              {filteredRequests.map((request) => (
                <LoanCard
                  key={request.id}
                  request={request}
                  isMarkedForReview={markedForReviewIds.includes(request.id)}
                  onToggleReview={handleToggleReview}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p className="empty-state__title">🔍 No se encontraron coincidencias</p>
              <p className="empty-state__description">
                Intente ajustar los términos de búsqueda o cambiar el filtro de estado seleccionado.
              </p>
            </div>
          )}
        </WorkspaceSection>

        {/* Uso adicional de WorkspaceSection con un bloque auxiliar de resumen */}
        <WorkspaceSection
          title="Resumen del Sistema"
          description="Información general sobre las solicitudes marcadas para revisión"
        >
          <p>
            Solicitudes en revisión activa: <strong>{markedForReviewIds.length}</strong>
          </p>
        </WorkspaceSection>
      </main>
    </div>
  );
}

// Función auxiliar para búsqueda insensible a mayúsculas
function criteriaMatches(targetText: string, queryText: string): boolean {
  if (!queryText) return true;
  return targetText.toLowerCase().includes(queryText.toLowerCase());
}

export default App;