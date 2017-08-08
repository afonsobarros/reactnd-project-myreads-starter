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
              <Link to='/' className='close-search'> back </Link>
              <div className='page book-details' style={{ width: '80%', margin: '0 auto', }} >
                <h1 style={{ textAlign: 'center' }}>{book.title}</h1>
                <div style={{ display: `table` }}>
                  <div style={{ display: `inline-block`, verticalAlign: 'middle', width: '26%', margin: '0 0 0 25%', textAlign: 'center' }}>
                    <Book book={book} shelves={shelves} updateBook={updateBook} />
                  </div>
                  <div style={{ display: `inline-block`, verticalAlign: 'middle', width: '49%', textAlign: 'left' }}>
                    <div className='preview-container'>
                      <a className='button' href={book.previewLink}>Preview book</a>
                    </div>
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
                      <p>{book.publisher} on {book.publishedDate}</p>
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
