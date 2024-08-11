interface Publisher {
  name: string;
}

interface Author {
  firstName: string;
  lastName: string;
  yearOfBirth: number;
  yearOfDeath: number;
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
  maxReservationsReached: boolean;
  coverImageUrl: string;
}

export interface BookReserved {
  id: number;
  title: string;
  author: Author;
  pages: string;
  reservationTerm: Date;
  reservationId: number;
  coverImageUrl: string;
  isAvailable: string;
  isIssued: string;
}
