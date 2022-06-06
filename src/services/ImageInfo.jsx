// import PropTypes from 'prop-types'
import { fetchPictures } from './PixabayApi';
import { Component } from 'react';
import ImageGallery from 'components/ImageGallery';
// import Button from 'components/Button';
// import Modal from 'components/Modal';
import { toast } from 'react-toastify';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import Button from 'components/Button';

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
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    this.setState({ status: Status.PENDING });
    const page = this.state.page;
    const nextQuary = this.props.quary;

    fetchPictures(nextQuary, page)
      .then(pics => {
        if (pics.hits.length === 0 && pics.totalHits !== 0) {
          toast.info(
            "We're sorry, but you've reached the end of search results."
          );
        }
        this.setState(prevState => ({
          pictures: [...prevState.pictures, ...pics.hits],
          status: Status.RESOLVED,
        }));
      })
      .catch(error => {
        console.log(error);
        toast.info(
          "We're sorry, but you've reached the end of search results."
        );
      });
  };

  render() {
    const { status, pictures } = this.state;

    if (status === 'pending') {
      return (
        <>
          {Loading.circle('Loading...')}
          <ImageGallery pictures={pictures} />
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
          <ImageGallery pictures={pictures} />
          {pictures.length !== 0 && (
            <Button incrementPage={this.incrementPage} />
          )}
        </>
      );
    }
  }
}

// import PropTypes from 'prop-types'
// import { Component } from 'react';
// import { fetchPictures } from './PixabayApi';

// const Status = {
//   IDLE: 'idle',
//   PENDING: 'pending',
//   RESOLVED: 'resolved',
//   REJECTED: 'rejected',
// };

// export default class ImageInfo extends Component {
//   state = {
//     pictures: [],
//     largeImage: '',
//     tags: '',
//     showModal: false,
//     status: Status.IDLE,
//     page: 1,
//   };

//   componentDidUpdate = prevProps => {
//     const { query, page } = this.state;
//     const prevName = prevProps.query;
//     const currentName = this.props.query;

//     if (prevName !== currentName) {
//       console.log(this.props.query);
//       this.setState({ status: Status.PENDING, query });

//       fetchPictures(query, page).then(pics => console.log(pics));
//     }
//   };

//   render() {
//     return <div>ImageInfo</div>;
//   }
// }
