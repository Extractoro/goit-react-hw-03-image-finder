// import PropTypes from 'prop-types'
import { fetchPictures } from './PixabayApi';
import { Component } from 'react';
import ImageGallery from 'components/ImageGallery';
// import Button from 'components/Button';
// import Modal from 'components/Modal';
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

  componentDidUpdate = prevProps => {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;

    if (prevQuery !== nextQuery) {
      this.setState({ status: Status.PENDING, page: 1 });
      const page = this.state.page;

      fetchPictures(nextQuery, page).then(pics => {
        if (pics.totalHits !== 0 && pics.hits.length !== 0) {
          toast.success(`Hooray! We found ${pics.totalHits} images.`);
        } else {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
        this.setState({
          pictures: [...pics.hits],
          totalPages: Math.ceil(pics.totalHits / 12),
          status: Status.RESOLVED,
        });
      });
    }
  };

  incrementPage = () => {
    this.setState(
      prevState => ({
        page: (prevState.page += 1),
      }),
      () => {
        this.setState({ status: Status.PENDING });
        const nextQuery = this.props.query;

        const page = this.state.page;

        fetchPictures(nextQuery, page)
          .then(pictures => {
            if (pictures.hits.length === 0 && pictures.totalHits !== 0) {
              toast.info(
                "We're sorry, but you've reached the end of search results."
              );
            }
            this.setState(prevState => ({
              pictures: [...prevState.pictures, ...pictures.hits],
              status: Status.RESOLVED,
            }));
          })
          .catch(() => {
            toast.info(
              "We're sorry, but you've reached the end of search results."
            );
          });
      }
    );
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
    const { status, pictures, showModal, largeImage, tags } = this.state;
    console.log(largeImage);

    if (status === 'pending') {
      return (
        <>
          {Loading.circle('Loading...')}
          <ImageGallery pictures={pictures} setInfoModal={this.setInfoModal} />
          {pictures.length !== 0 && (
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
          {pictures.length !== 0 && (
            <Button incrementPage={this.incrementPage} />
          )}
        </>
      );
    }
  }
}
