// import PropTypes from 'prop-types'
import { Container } from 'components/Container';
import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageInfo from 'services/ImageInfo';
import Searchbar from './Searchbar';

export class App extends Component {
  state = {
    query: null,
  };

  handleFormSubmit = query => {
    this.setState({ query });
  };

  render() {
    const { query } = this.state;
    return (
      <>
        <ToastContainer onClose={3000} />
        <header>
          <Searchbar onSubmit={this.handleFormSubmit} />
        </header>
        <main>
          <Container>
            <ImageInfo query={query} />
          </Container>
        </main>
      </>
    );
  }
}
