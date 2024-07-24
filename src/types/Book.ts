interface Publisher {
  name: string;
}

interface Author {
  firstName: string;
  lastName: string;
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
  isAvailable: boolean;
  isIssued: boolean;
  isIssuedToMember: boolean;
  isReservedByMember: boolean;
  reservationTerm: Date | null;
  maxReservationsReached: bool;
  coverImageUrl: string;
}
