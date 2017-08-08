import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Shelf from '../components/Shelf';

class Home extends Component {

  filterByShelve (bookList, shelf) {
    return bookList.filter( book => book.shelf === shelf );
  }

  getShelfTitle = (shelf) => {
    shelf = shelf.replace(/([A-Z])/g, ' $1').trim()
    return shelf.charAt(0).toUpperCase() + shelf.slice(1).toLowerCase();
  }

  render() {

    const { books, shelves, updateBook} = this.props;

    return (
      <div className="list-books">
        <div className="list-books-content">
          <div>
            {
              shelves.map( (shelf, index ) => (
               <Shelf key={shelf + index} 
                      title={ this.getShelfTitle(shelf) }
                      books={ this.filterByShelve(books, shelf) } 
                      shelf={ shelf } 
                      shelves={ shelves } 
                      updateBook={ updateBook } />
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
