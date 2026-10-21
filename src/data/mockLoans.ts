import type { LoanRequest } from '../types/loan';

export const initialLoanRequests: LoanRequest[] = [
    {
    id: 'REQ-101',
    resourceName: 'Cámara Canon EOS R6',
    category: 'Camara',
    applicantName: 'Grace Calderón',
    requestDate: '2026-10-15',
    returnDate: '2026-10-22',
    status: 'En Préstamo',
    },
    {
    id: 'REQ-102',
    resourceName: 'Micrófono Lavalier Rode Link',
    category: 'Audio',
    applicantName: 'Diego Gómez',
    requestDate: '2026-10-18',
    returnDate: null, // Caso explícito de fecha de devolución ausente/no confirmada
    status: 'Pendiente',
    },
    {
    id: 'REQ-103',
    resourceName: 'Kit de Luces LED Godox',
    category: 'Iluminación',
    applicantName: 'Nicole López',
    requestDate: '2026-10-10',
    returnDate: '2026-10-14',
    status: 'Aprobado',
    },
    {
    id: 'REQ-104',
    resourceName: 'Proyector Epson Full HD',
    category: 'Proyección',
    applicantName: 'Fernando Molina',
    requestDate: '2026-10-05',
    returnDate: '2026-10-08',
    status: 'Rechazado',
    },
];