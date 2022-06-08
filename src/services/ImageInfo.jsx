// import PropTypes from 'prop-types'
import { fetchPictures } from './PixabayApi';
import { Component } from 'react';
import ImageGallery from 'components/ImageGallery';
import { toast } from 'react-toastify';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import Button from 'components/Button';
import Modal from 'components/Modal';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class ImageInfo extends Component {
  state = {
    pictures: [],
    largeImage: '',
    tags: '',
    showModal: false,
    status: Status.IDLE,
    totalPages: 0,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;

    if (prevQuery !== nextQuery) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const page = this.state.page;
    const nextQuery = this.props.query;

    try {
      this.setState({ status: Status.PENDING });

      await fetchPictures(nextQuery, page).then(data => {
        const getData = data.hits;
        if (getData.length === 0) {
          this.setState({ status: Status.REJECTED });
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          this.setState(prevState => ({
            pictures: [...prevState.pictures, ...getData],
            totalPages: data.hits.length,
            status: Status.RESOLVED,
          }));
        }
      });
    } catch (error) {
      toast.warn("We're sorry, the search didn't return any results.");
    }
  };

  // componentDidUpdate = prevProps => {
  //   const prevQuery = prevProps.query;
  //   const nextQuery = this.props.query;

  //   if (prevQuery !== nextQuery) {
  //     this.setState({ status: Status.PENDING, page: 1 });
  //     const page = this.state.page;

  //     fetchPictures(nextQuery, page).then(pics => {
  //       if (pics.totalHits !== 0 && pics.hits.length !== 0) {
  //         toast.success(`Hooray! We found ${pics.totalHits} images.`);
  //       } else {
  //         toast.error(
  //           'Sorry, there are no images matching your search query. Please try again.'
  //         );
  //       }
  //       this.setState({
  //         pictures: [...pics.hits],
  //         totalPages: pics.hits.length,
  //         status: Status.RESOLVED,
  //       });
  //     });
  //   }
  // };

  incrementPage = () => {
    const { page } = this.state;
    this.setState({ page: page + 1 });
    console.log('dfgdfg');
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
    const { status, pictures, showModal, largeImage, tags, totalPages } =
      this.state;

    if (status === 'pending') {
      return (
        <>
          {Loading.circle('Loading...')}
          <ImageGallery pictures={pictures} setInfoModal={this.setInfoModal} />
          {pictures.length !== 0 && totalPages !== 0 && (
            <Button incrementPage={this.incrementPage} />
          )}
        </>
      );
    }

    if (status === 'resolved') {
      return (
        <>
          {Loading.remove()}
          <ImageGallery pictures={pictures} setInfoModal={this.setInfoModal} />
          {showModal && (
            <Modal
              onClose={this.toggleModal}
              largeImage={largeImage}
              tags={tags}
            />
          )}
          {pictures.length !== 0 && totalPages !== 0 && (
            <Button incrementPage={this.incrementPage} />
          )}
        </>
      );
    }
  }
}
