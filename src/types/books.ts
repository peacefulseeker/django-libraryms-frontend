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
  coverImageUrl: string | null;
  amountInQueue: number;
  reservationTerm: Date | null;
  isAvailable: boolean;
  isIssued: boolean;
  isReserved: boolean;

  isIssuedToMember?: boolean;
  isEnqueuedByMember?: boolean;
  isReservedByMember?: boolean;
  isMaxReservationsReached?: boolean;
  isMaxEnqueuedOrdersReached?: boolean;
}
export interface BookInList {
  id: number;
  author: Author;
  title: string;
  coverImageUrl: string | null;
  reservationTerm?: Date;
  reservationId?: number;
  reservationExtendable?: boolean;
  hasRequestedExtension?: boolean;
  amountInQueue?: number;
}

export interface BookReserved extends BookInList {
  reservationTerm: Date;
  reservationId: number;
  reservationExtendable: boolean;
  hasRequestedExtension: boolean;
}

export interface BookEnqueued extends BookInList {
  amountInQueue: number;
}
