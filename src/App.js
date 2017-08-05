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
        console.log('BooksAPI.getAll', books);
        this.setState({ books });
      })
  }

  render() {
    const { books } = this.props
    return (
      <div className="app">
        <Route exact path='/' render={( books ) => (
          <Home books={this.state.books}/>
        )} />

        <Route path='/search' render={() => (
          <Search  books={this.state.books} />
        )} />

      </div>
    )
  }
}

export default BooksApp
