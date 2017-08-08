import React from 'react';
import Book from './Book';

const Shelf = ( props ) => {

  const { books, shelves, updateBook, title } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            books.map((book, index) => (
              <li key={book.id + index}>
                <Book book={book} shelves={shelves} updateBook={updateBook} />
              </li>
            ))
          }
        </ol>
      </div>
    </div>
  )
}

export default Shelf;
