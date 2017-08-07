import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import sortBy from 'sort-by';

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
          return book;
        })
        books.sort(sortBy('title'));
        this.setState({ books, shelves });
      }
    )
  }

  updateBook = (book, shelf) => {
    console.log('updateBook', book, shelf)
    let books = this.state.books;
    book.shelf = shelf;

    if (books)
      BooksAPI.update(book, shelf).then(
        res => {
          //console.log('BooksAPI.update', res);
          let listIndex = -1;
          books.map((item, index) => {
            if (item.id === book.id) {
              item.shelf = book.shelf;
              listIndex = index;
            }
            return item;
          })

          if (listIndex === -1) {
            books.push(book);
          } else {
            if (shelf === 'none' || shelf === 'clear') {
              books = books.splice(listIndex, 1);
            }
          }

          books.sort(sortBy('title'));
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
