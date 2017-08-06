import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {

  getShelfTitle = (shelf) => {
    shelf = shelf.replace(/([A-Z])/g, ' $1').trim()
    return shelf.charAt(0).toUpperCase() + shelf.slice(1).toLowerCase();
  }

  render() {

    const { books, shelves} = this.props;

    //console.log('shelves', shelves)
    //console.log('books', books)
    return (
      <div className="list-books">
        <div className="list-books-content">
          <div>
            {
              shelves.map(shelf => (
                <div key={shelf} className="bookshelf">
                  <h2 className="bookshelf-title">{this.getShelfTitle(shelf)}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {
                        books.map(book => book.shelf === shelf ? (
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                  <select value={shelf} onChange={e => updateBook(book, e.target.value)}>
                                    <option value="none" disabled>Move to...</option>
                                    {
                                      shelves.map(shelfOpt => (
                                        <option key={shelfOpt} 
                                                value={shelfOpt}>
                                          {this.getShelfTitle(shelfOpt)}
                                        </option>
                                      ))}
                                    <option value="">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{book.authors.toString()}                                
                                {
                                  book.authors.map( (author, index) => {
                                    <span key={index}>{author}</span>
                                  })
                                }
                                </div>
                            </div>
                          </li>
                        ) : '')
                      }
                    </ol>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Search a book</Link>
        </div>
      </div>
    )
  }
}

export default Home;
