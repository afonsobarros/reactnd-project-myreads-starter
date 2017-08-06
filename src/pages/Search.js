import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import Book from '../components/Book';

class Search extends Component {

  state = {
    query: ''
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {

    const { books } = this.props;
    const { query } = this.state;

    let filteredBooks;
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      filteredBooks = books.filter((book) => match.test(book.title))
    } else {
      filteredBooks = books
    }

    filteredBooks.sort(sortBy('title'))

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */
            }
            <input type="text" placeholder="Search by title or author"
              value={query}
              onChange={(e) => this.updateQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">

          {
            filteredBooks.length < 1 && (
              <div>
                <p>
                  <span>NOTES: The search from BooksAPI is limited to a particular set of search terms. Please use one of the following: </span>
                  <a href="https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md" target="_blank">check search terms</a>
                </p>
                <p>However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if you don't find a specific author or title.</p>
                <p> Every search is limited by search terms.</p>
              </div>
            )
          }
          <ol className="books-grid">
            {
              filteredBooks.map((book) => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                      <div className="book-shelf-changer">
                        <select>
                          <option value="none" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors.toString()}</div>
                  </div>
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}


export default Search;