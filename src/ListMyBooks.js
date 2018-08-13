import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
// import escapeRegExp from 'escape-string-regexp'
// import sortBy from 'sort-by'

class ListMyBooks extends Component {
  static propTypes = {
    booksCurrentlyReading: PropTypes.array.isRequired,
    booksWantToRead: PropTypes.array.isRequired,
    booksRead: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired
  }

  handleSubmit = (book, oldShelfString, e) => {
    e.preventDefault();
    const newShelfString = e.target.value;
    this.props.onUpdateShelf(book, oldShelfString, newShelfString);
  }
    render() {
      return (<div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">

                  {
                    this.props.booksCurrentlyReading.map((book) => (<li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${book.imageLinks.thumbnail})`
                            }}></div>
                          <div className="book-shelf-changer">
                            <select onChange={(event) => this.handleSubmit(book, 'currentlyReading', event)}>
                              <option value="move" disabled="disabled">Move to...</option>
                              <option value="currentlyReading" selected="selected">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
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
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">

                  {
                    this.props.booksWantToRead.map((book) => (<li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${book.imageLinks.thumbnail})`
                            }}></div>
                          <div className="book-shelf-changer">
                            <select onChange={(event) => this.handleSubmit(book, 'wantToRead', event)}>
                              <option value="move" disabled="disabled">Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead" selected="selected">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
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
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">

                  {
                    this.props.booksRead.map((book) => (<li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{
                              width: 128,
                              height: 193,
                              backgroundImage: `url(${book.imageLinks.thumbnail})`
                            }}></div>
                          <div className="book-shelf-changer">
                            <select onChange={(event) => this.handleSubmit(book, 'read', event)}>
                              <option value="move" disabled="disabled">Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read" selected="selected">Read</option>
                              <option value="none">None</option>
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
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search' className='open-search-link'>Add a book</Link>
        </div>
      </div>);
    }
  }

  export default ListMyBooks;
