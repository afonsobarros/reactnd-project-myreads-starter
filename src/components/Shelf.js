import React, { Component } from 'react';
import Book from './Book';

class Shelf extends Component {

  getShelfTitle = (shelf) => {
    shelf = shelf.replace(/([A-Z])/g, ' $1').trim()
    return shelf.charAt(0).toUpperCase() + shelf.slice(1).toLowerCase();
  }

  render() {

    const { shelf, books, shelves, updateBook} = this.props;
    const title = this.props.title || this.getShelfTitle(shelf);
    
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{ title }</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              books.map(book => book.shelf === shelf ? (
                <li key={book.id}>
                  <Book book={ book } shelves={ shelves } updateBook={ updateBook } />
                </li>
              ) : '')
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf;
