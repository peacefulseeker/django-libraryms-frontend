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
  coverImageUrl: string;
  reservationTerm: Date | null;
  isAvailable: boolean;
  isIssued: boolean;
  isReserved: boolean;
  isIssuedToMember: boolean;
  isQueuedByMember: boolean;
  isReservedByMember: boolean;
  isMaxReservationsReached: boolean;
}
export interface BookInList {
  id: number;
  author: Author;
  title: string;
  coverImageUrl: string;
}

export interface BookReserved extends BookInList {
  pages: string;
  reservationTerm: Date;
  reservationId: number;
  isAvailable: string;
  isIssued: string;
}
