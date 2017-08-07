import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Shelf from '../components/Shelf';

class Home extends Component {

  filterByShelve (bookList, shelf) {
    return bookList.filter( book => book.shelf === shelf );
  }

  render() {

    const { books, shelves, updateBook} = this.props;

    //console.log('Home shelves', shelves)
    //console.log('Home books', books)
    return (
      <div className="list-books">
        <div className="list-books-content">
          <div>
            {
              shelves.map( (shelf, index ) => (
               <Shelf key={shelf + index} books={ this.filterByShelve(books, shelf) } shelf={ shelf } shelves={ shelves } updateBook={ updateBook } />
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
