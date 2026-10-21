export type LoanStatus = 'Pendiente' | 'Aprobado' | 'Rechazado' | 'En Préstamo';
export type EquipmentCategory = 'Camara' | 'Audio' | 'Iluminación' | 'Proyección' | 'Accesorios';

export interface LoanRequest {
    id: string;                  
    resourceName: string;        
    category: EquipmentCategory; 
    applicantName: string;       
    requestDate: string;        
    returnDate?: string | null;  
    status: LoanStatus;          
}

// Criterios enviados por el formulario de búsqueda hacia la pantalla principal
export interface SearchCriteria {
    query: string;               
    status: LoanStatus | 'Todos'; 
}