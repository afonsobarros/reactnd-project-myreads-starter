import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './App.css'

import Search from './pages/Search';
import Home from './pages/Home';
import * as BooksAPI from './utils/BooksAPI'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        //console.log('BooksAPI.getAll', books);
        this.setState({ books });
      })
  }

  updateBook = (book, shelf) => {
    //console.log('updateBook', book, shelf)
    let books = this.state.books;
    BooksAPI.update(book, shelf).then(res => {
        book.shelf = shelf;
        this.setState( books )
      }
    )
  }

  render() {
    const { books } = this.props
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>My Reads</h1>
          </div>

          <Route exact path='/' render={() => (
            <Home books={this.state.books} updateBook={ this.updateBook } />
          )} />

          <Route path='/search' render={() => (
            <Search books={this.state.books} />
          )} />

        </div>
      </div>
    )
  }
}

export default BooksApp
