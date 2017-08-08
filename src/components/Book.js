import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Book extends Component {

  getShelfTitle = (shelf) => {
    shelf = shelf.replace(/([A-Z])/g, ' $1').trim()
    return shelf.charAt(0).toUpperCase() + shelf.slice(1).toLowerCase();
  }

  render() {

    const { book, shelves } = this.props;
    if (!book.shelf)
      book.shelf = 'none';

    return (
      <div className="book">
        <div className="book-top">
          <Link to={`/details/${book.id}`}>
            <div className="book-cover" style={{ backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
          </Link>
          <div className="book-shelf-changer">

            <select value={book.shelf} onChange={e => this.props.updateBook(book, e.target.value)}>
              <option value="none" disabled>Move to...</option>
              {
                shelves.map((shelfOpt, index) => (
                  <option key={shelfOpt + index} value={shelfOpt}>
                    {this.getShelfTitle(shelfOpt)}
                  </option>
                ))
              }
              <option value="none">None</option>
              }
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {
            book.authors && book.authors.map((author, index) =>
              <span key={index}>{author}</span>
            )
          }
        </div>
      </div>
    )
  }
}

export default Book;
