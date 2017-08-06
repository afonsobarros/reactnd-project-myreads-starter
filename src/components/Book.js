import React, { Component } from 'react';

class Book extends Component {
  
  getShelfTitle = (shelf) => {
    shelf = shelf.replace(/([A-Z])/g, ' $1').trim()
    return shelf.charAt(0).toUpperCase() + shelf.slice(1).toLowerCase();
  }

  render() {

    const { book, shelves} = this.props;
    
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select value={book.shelf} onChange={e => this.props.updateBook(book, e.target.value)}>
              <option value="none" disabled>Move to...</option>
              {
                shelves.map(shelfOpt => (
                  <option key={shelfOpt}
                    value={shelfOpt}>
                    {this.getShelfTitle(shelfOpt)}
                  </option>
                ))}
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors && book.authors.toString()}
          {
            book.authors && book.authors.map((author, index) => {
              <span key={index}>{author}</span>
            })
          }
        </div>
      </div>
    )
  }
}

export default Book;
