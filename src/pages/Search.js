import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import Book from '../components/Book';
import * as BooksAPI from '../utils/BooksAPI';

class Search extends Component {

  state = {
    query: '',
    searchResults: []
  }

  constructor() {
    super();
    this.loadTimeout = 0;
    this.myReadingBooks = [];
  }

  updateQuery = (query) => {
    clearTimeout(this.loadTimeout);
    this.setState({ query: query.trim() })
    this.loadTimeout = setTimeout(() => this.getBooks(query), 500)
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  getShelfTitle = (shelf) => {
    shelf = shelf.replace(/([A-Z])/g, ' $1').trim()
    return shelf.charAt(0).toUpperCase() + shelf.slice(1).toLowerCase();
  }

  getBooks(query) {

    const books = this.props.books;

    BooksAPI.search(query).then(
      res => {
        //console.log('search books', res)
        if (res) {
          const bookList = res.error ? [] : res.map(book => {
            books.map(item => {
              if (item.id === book.id) {
                book.shelf = item.shelf;
              }
              return item;
            })
            return book;
          });
          this.setState({
            searchResults: bookList
          })
        }
      }
    )
  }

  render() {

    const { books, shelves } = this.props;
    const { query, searchResults } = this.state;

    let myReadingBooks = this.myReadingBooks;

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      myReadingBooks = books.filter((book) => match.test(book.title) || match.test(book.authors.toString()))
    } else {
      myReadingBooks = books
    }

    myReadingBooks.sort(sortBy('title'))

    if (searchResults && searchResults.length > 0) {
      searchResults.sort(sortBy('title'))
    }

    //console.log('Search shelves', shelves)
    //console.log('Search books', books)

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
              value={query}
              onChange={(e) => this.updateQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <div className="bookshelf">
            <h2 className="bookshelf-title">Search results</h2>
            {
              searchResults.length < 1 && this.state.query !== '' && (
                <p>
                  No results retrieved for <b>"{this.state.query}"</b>. Try another term.
                </p>
              )
            }
            {
              searchResults.length < 1 && (
                <div>
                  <p>
                    <span>The search from BooksAPI is limited to a particular set of search terms. Please use one of the following: </span>
                    <a href="https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md" target="_blank" rel="noopener noreferrer" title="check search terms">check search terms</a>
                  </p>
                  <p>However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if you don't find a specific author or title.</p>
                  <p> Every search is limited by search terms.</p>
                </div>
              )
            }

            {
              searchResults && searchResults.length > 1 && (

                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {
                      searchResults.map((book) => (
                        <li key={book.id}>
                          <Book book={book} shelves={shelves} updateBook={this.props.updateBook} />
                        </li>
                      ))
                    }
                  </ol>
                </div>
              )
            }
          </div>

          <div className="search-books-results">
            <div className="bookshelf">
              <h2 className="bookshelf-title">In my collections</h2>
              {
                myReadingBooks.length < 1 && this.state.query !== '' && (
                  <div>
                    <p>
                      No books found in My Collections for "<b>{this.state.query}</b>". Try another term.
                    </p>
                  </div>
                )
              }

              {
                myReadingBooks.length > 1 && (

                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {
                        myReadingBooks.map((book) => (
                          <li key={book.id}>
                            <Book book={book} shelves={shelves} updateBook={this.props.updateBook} />
                          </li>
                        ))
                      }
                    </ol>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default Search;