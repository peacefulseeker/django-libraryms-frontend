interface Publisher {
  name: string;
}

interface Author {
  firstName: string;
  lastName: string;
  yearOfBirth: number;
  yearOfDeath: number;
}

interface Reservation {
  status: string;
  term: Date;
}

export interface Book {
  id: number;
  title: string;
  author: Author;
  publisher: Publisher;
  publishedAt: Date;
  language: string;
  isbn: string;
  pages: number;
  pagesDescription: string;
  isAvailable: boolean;
  isIssued: boolean;
  isReserved: boolean;
  isIssuedToMember: boolean;
  isQueuedByMember: boolean;
  isReservedByMember: boolean;
  reservationTerm: Date | null;
  maxReservationsReached: bool;
  coverImageUrl: string;
}
