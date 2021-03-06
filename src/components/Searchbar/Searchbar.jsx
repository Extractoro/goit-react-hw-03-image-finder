// import PropTypes from 'prop-types'
import React, { Component } from 'react';
import s from './Searchbar.module.css';
import { BiSearch } from 'react-icons/bi';
import { toast } from 'react-toastify';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  handleNameChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.query.trim() === '') {
      toast.error('Oops! Entered an empty string');
      return;
    }

    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <header className={s['searchbar']}>
        <form className={s['form']} onSubmit={this.handleSubmit}>
          <button type="submit" className={s['button']}>
            <BiSearch size={25} />
          </button>

          <input
            onChange={this.handleNameChange}
            className={s['input']}
            type="text"
            autoComplete="off"
            value={this.state.query}
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
