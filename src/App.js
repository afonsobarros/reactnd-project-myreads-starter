import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import './App.css'

import Search from './pages/Search';
import Home from './pages/Home';
import * as BooksAPI from './utils/BooksAPI';

class BooksApp extends Component {
  state = {
    books: [],
    shelves: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(
      books => {
        //console.log('BooksAPI.getAll', books);
        let shelves = [];
        books.map(book => {
          if (shelves.indexOf(book.shelf) === -1) shelves.push(book.shelf);
        })
        this.setState({ books, shelves });
      }
    )
  }

  updateBook = (book, shelf) => {
    //console.log('updateBook', book, shelf)
    let books = this.state.books;
    BooksAPI.update(book, shelf).then(
      res => {
        book.shelf = shelf;
        this.setState(books);
      }
    )
  }

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <Link to="/"><h1>My Reads</h1></Link>
          </div>

          <Route exact path='/' render={() => (
            <Home books={this.state.books} shelves={this.state.shelves} updateBook={this.updateBook} />
          )} />

          <Route path='/search' render={() => (
            <Search books={this.state.books} shelves={this.state.shelves} updateBook={this.updateBook} />
          )} />

        </div>
      </div>
    )
  }
}

export default BooksApp
