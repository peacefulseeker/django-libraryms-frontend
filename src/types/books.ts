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
  coverImageUrl?: string;
  reservationTerm?: Date;
  isAvailable: boolean;
  isIssued: boolean;
  isReserved: boolean;
  isIssuedToMember: boolean;
  isEnqueuedByMember: boolean;
  isReservedByMember: boolean;
  isMaxReservationsReached: boolean;
  isMaxEnqueuedOrdersReached: boolean;
  amountInQueue: number;
}
export interface BookInList {
  id: number;
  author: Author;
  title: string;
  coverImageUrl?: string;
  isIssued?: boolean;
  reservationTerm?: Date;
  reservationId?: number;
  amountInQueue?: number;
}

export interface BookReserved extends BookInList {
  reservationTerm: Date;
  reservationId: number;
  isIssued: boolean;
  amountInQueue: number;
}

export interface BookEnqueued extends BookInList {
  amountInQueue: number;
}
