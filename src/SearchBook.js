import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
// import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class SearchBook extends Component {
  state = {
    showingBooks: []
  }

  handleSubmit = (book, oldShelfString, e) => {
    const newShelfString = e.target.value;
    this.props.onUpdateShelf(book, oldShelfString, newShelfString)
  }
  updateSearch = (query) => {
    BooksAPI.search(query).then((books) => {
      if (query.length > 0 && books.length > 0) {
        let loadedBooks = books.map(function(book) {
          return book;
        });
        const {booksCurrentlyReading, booksWantToRead, booksRead, booksNone} = this.props;
        const {showingBooks} = this.state;
        const allBooks = booksNone.concat(booksCurrentlyReading, booksWantToRead, booksRead);
        for (let loadedBook of loadedBooks) {
          loadedBook.shelf = 'none';
        }
        for (let bookInShelt of allBooks) {
          for (let loadedBook of loadedBooks) {
            if (loadedBook.title === bookInShelt.title) {
              let index = loadedBooks.indexOf(loadedBook);
              loadedBooks[index] = bookInShelt;
            }
          }
        }
        this.setState({showingBooks: loadedBooks});
      } else {
        this.clearBooks();
      }
    });

  };

  clearBooks = () => {
    this.setState({showingBooks: []});
  };

  render() {
    return (<div className="search-books">
      <div className="search-books-bar">
        <Link to='/' className='close-search'>Close</Link>
        <div className="search-books-input-wrapper">
          <input type="text" placeholder="Search by title or author" onChange={(event) => this.updateSearch(event.target.value)}/>

        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {
            this.state.showingBooks.map((book) => (<li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url(${book.imageLinks.thumbnail})`
                    }}></div>
                  <div className="book-shelf-changer">
                    {/* used a tertinary operator to check the book.shelf because using value={book.shelf} on select caused problems */}
                    <select onBlur={(event) => this.handleSubmit(book, book.shelf, event)}>
                      <option value="move" disabled="disabled">Move to...</option>
                      <option value="currentlyReading" selected={((book.shelf == 'currentlyReading') ? 'selected' : '')}>Currently Reading</option>
                      <option value="wantToRead" selected={((book.shelf == 'wantToRead') ? 'selected' : '')}>Want to Read</option>
                      <option value="read" selected={((book.shelf == 'read') ? 'selected' : '')}>Read</option>
                      <option value="none" selected={((book.shelf == 'none') ? 'selected' : '')}>None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </div>
            </li>))
          }
        </ol>
      </div>
    </div>);
  }
}

export default SearchBook;
