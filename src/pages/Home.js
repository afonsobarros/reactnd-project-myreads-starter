import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from '../components/Book';

class Home extends Component {

  getShelfTitle = (shelf) => {
    shelf = shelf.replace(/([A-Z])/g, ' $1').trim()
    return shelf.charAt(0).toUpperCase() + shelf.slice(1).toLowerCase();
  }

  render() {

    const { books, shelves} = this.props;

    //console.log('Home shelves', shelves)
    //console.log('Home books', books)
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
                            <Book book={book} shelves={shelves} updateBook={this.props.updateBook} />
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
