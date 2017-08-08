import React, { Component } from 'react'
import * as BooksAPI from '../utils/BooksAPI'
import Book from '../components/Book'
import { Link } from 'react-router-dom';

class Details extends Component {
  state = {
    book: {}
  }

  componentDidMount() {
    const bookId = this.props.match.params['bookId'];
    BooksAPI.get(bookId).then(
      book => {
        this.setState({
          book
        })
      }
    )
  }

  render() {

    let { book } = this.state;
    let { shelves, updateBook } = this.props;

    return (
      <div>
        {
          book && book.id && (
            <div>
              <Link to="/" onClick={() => { window.history.goBack() }} className='close-search'> back </Link>
              <div className='page book-details'>
                <h1 >{book.title}</h1>
                <div className="grid">
                  <div className="book-component">
                    <Book book={book} shelves={shelves} updateBook={updateBook} />
                  </div>
                  <div className="details">
                    
                    {book.authors && book.authors.length > 0 && (
                      <div className='list'>
                        <h3>Authors</h3>
                        <ul>
                          {book.authors.map(
                            (author, index) => <li key={index}>{author}</li>
                          )}
                        </ul>
                      </div>
                    )}
                    {book.categories && book.categories.length > 0 && (
                      <div className='list'>
                        <h3>Categories</h3>
                        <ul>
                          {book.categories.map(
                            (category, index) => <li key={index}>{category}</li>
                          )}
                        </ul>
                      </div>
                    )}
                    <div className='list'>
                      <h3>Published by</h3>
                      <ul>
                        <li>{book.publisher} on {book.publishedDate}</li>
                      </ul>
                    </div>
                  </div>
                  <p className='description' >{book.description}</p>
                </div>
              </div>
            </div>
          )
        }
        <div className="open-search">
          <Link to="/search">Search a book</Link>
        </div>
      </div>
    )
  }
}

export default Details
