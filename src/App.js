import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListMyBooks from './ListMyBooks';
import SearchBook from './SearchBook';

class BooksApp extends Component {

  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    none: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      books.forEach((book) => registerBook(book));
    });
    let that = this;
    function registerBook(book) {
      switch (book.shelf) {
        case 'currentlyReading':
          that.setState((state) => ({
            currentlyReading: state.currentlyReading.concat([book])
          }));
          break;
        case 'wantToRead':
          that.setState((state) => ({
            wantToRead: state.wantToRead.concat([book])
          }));
          break;
        case 'read':
          that.setState((state) => ({
            read: state.read.concat([book])
          }));
          break;
        default:
          that.setState((state) => ({
            none: state.none.concat([book])
          }));
          break;
      }
    }
  }

  updateShelf(book, oldShelfString = undefined, newShelfString = undefined) {

    BooksAPI.update(book, newShelfString);
    switch (newShelfString) {
      case 'currentlyReading':
        this.setState((state) => ({
          currentlyReading: state.currentlyReading.concat([book])
        }));
        break;
      case 'wantToRead':
        this.setState((state) => ({
          wantToRead: state.wantToRead.concat([book])
        }));
        break;
      case 'read':
        this.setState((state) => ({
          read: state.read.concat([book])
        }));
        break;
      default:
        this.setState((state) => ({
          none: state.none.concat([book])
        }));
        break;
    }

    switch (oldShelfString) {
      case 'currentlyReading':
        this.setState((state) => ({
          currentlyReading: state.currentlyReading.filter((b) => b.id !== book.id)
        }));
        break;
      case 'wantToRead':
        this.setState((state) => ({
          wantToRead: state.wantToRead.filter((b) => b.id !== book.id)
        }));
        break;
      case 'read':
        this.setState((state) => ({
          read: state.read.filter((b) => b.id !== book.id)
        }));
        break;
      default:
        this.setState((state) => ({
          none: state.none.filter((b) => b.id !== book.id)
        }));
        break;
    }

  }
  render() {
    return (<div className="app">

      <Route exact="exact" path='/' render={() => (<ListMyBooks booksCurrentlyReading={this.state.currentlyReading} booksWantToRead={this.state.wantToRead} booksRead={this.state.read} onUpdateShelf={(book, Oldshelf, NewShelf) => {
            this.updateShelf(book, Oldshelf, NewShelf);
          }}/>)}/>

      <Route exact="exact" path='/search' render={() => (<SearchBook booksCurrentlyReading={this.state.currentlyReading} booksWantToRead={this.state.wantToRead} booksNone={this.state.none} booksRead={this.state.read} onUpdateShelf={(book, Oldshelf, NewShelf) => {
            this.updateShelf(book, Oldshelf, NewShelf);
          }}/>)}/>

    </div>);
  }
}

export default BooksApp;
