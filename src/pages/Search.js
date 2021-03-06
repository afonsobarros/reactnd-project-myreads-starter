import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    this.setState({ query: query.toLowerCase() })
    if (query !== '') {
      this.loadTimeout = setTimeout(() => this.getBooks(query), 500);
    }
  }

  getShelfTitle = (shelf) => {
    shelf = shelf.replace(/([A-Z])/g, ' $1').trim()
    return shelf.charAt(0).toUpperCase() + shelf.slice(1).toLowerCase();
  }

  getBooks(query) {
    const books = this.props.books;
    BooksAPI.search(query).then(
      res => {
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
      const match = new RegExp(escapeRegExp(query), 'i');

      myReadingBooks = books.filter((book) => {
        let result = false;
        if (book.authors)
          result = match.test(book.title.toLowerCase()) || match.test(book.authors.toString().toLowerCase());
        else result = match.test(book.title.toLowerCase());
        return result ? book : null;
      })

    } else {
      myReadingBooks = books;
    }

    myReadingBooks.sort(sortBy('title'))

    if (searchResults && searchResults.length > 0) {
      searchResults.sort(sortBy('title'))
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" onClick={() => { window.history.goBack() }} className='close-search'> back </Link>
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

              searchResults.length === 0 && query !== '' && (
                <p>
                  No results retrieved for <b>"{query}"</b>. Try another term.
                </p>
              )
            }
            {
              searchResults.length === 0 && (
                <div>
                  <p>The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found <a href="https://github.com/afonsobarros/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md" target="_blank" rel="noopener noreferrer" title="check search terms">here</a>. </p>
                  <p>That list of terms are the only terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.</p>
                </div>
              )
            }

            {
              searchResults && searchResults.length > 0 && (

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
              <h2 className="bookshelf-title">My collections</h2>
              {
                myReadingBooks.length < 1 && query !== '' && (
                  <div>
                    <p>
                      No books found in My Collections for "<b>{query}</b>". Try another term.
                    </p>
                  </div>
                )
              }

              {
                myReadingBooks.length > 0 && (

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