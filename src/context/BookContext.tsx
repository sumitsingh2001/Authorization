import React from 'react';

// BOOK ID CONTEXT
interface BookContextProps {
  bookId: number | null;
  setBookId: (id: number | null) => void;
}

export const BookContext = React.createContext<BookContextProps>({
  bookId: null,
  setBookId: () => {},
});
