// import PropTypes from 'prop-types'
import { Container } from 'components/Container';
import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchPictures } from 'services/PixabayApi';
import Searchbar from './Searchbar';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import Button from 'components/Button';
import Modal from 'components/Modal';
import ImageGallery from './ImageGallery';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export class App extends Component {
  state = {
    query: '',
    pictures: [],
    largeImage: '',
    tags: '',
    showModal: false,
    status: Status.IDLE,
    totalPages: 0,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { query, page } = this.state;

    try {
      this.setState({ status: Status.PENDING });

      await fetchPictures(query, page).then(data => {
        const getData = data.hits;
        if (getData.length === 0) {
          this.setState({ status: Status.REJECTED });
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...getData],
            totalPages: Math.ceil(data.totalHits / 12),
            status: Status.RESOLVED,
          }));
        }
      });
    } catch (error) {
      toast.warn("We're sorry, the search didn't return any results.");
    }
  };

  onFormSubmit = query => {
    this.setState({ query, page: 1, pictures: [] });
  };

  incrementPage = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  setInfoModal = (url, tags) => {
    this.setState({ largeImage: url, tags });
    this.toggleModal();
  };

  render() {
    const { pictures, largeImage, tags, showModal, status, totalPages, page } =
      this.state;
    return (
      <>
        <ToastContainer onClose={3000} />
        <header>
          <Searchbar onSubmit={this.onFormSubmit} />
        </header>
        <main>
          <Container>
            {status === Status.PENDING && (
              <>
                {Loading.circle('Loading...')}
                <ImageGallery
                  pictures={pictures}
                  setInfoModal={this.setInfoModal}
                />
                {pictures.length !== 0 && totalPages !== 0 && (
                  <Button incrementPage={this.incrementPage} />
                )}
              </>
            )}
            {status === Status.RESOLVED && (
              <>
                {Loading.remove()}
                <ImageGallery
                  pictures={pictures}
                  setInfoModal={this.setInfoModal}
                />
                {showModal && (
                  <Modal
                    onClose={this.toggleModal}
                    largeImage={largeImage}
                    tags={tags}
                  />
                )}
              </>
            )}
            {status === Status.RESOLVED && page < totalPages && (
              <Button incrementPage={this.incrementPage} />
            )}
          </Container>
        </main>
      </>
    );
  }
}
