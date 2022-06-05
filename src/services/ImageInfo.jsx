// import PropTypes from 'prop-types'
import { fetchPictures } from './pixabayApi';
import { Component } from 'react';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Modal from 'components/Modal';
import { toast } from 'react-toastify';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const Status = {
	IDLE: 'idle',
	PENDING: 'pending',
	RESOLVED: 'resolved',
	REJECTED: 'rejected',
};

export default class ImageInfo extends Component {
	static defaultProps = {
		initialPage: 1,
	};

	state = {
		pictures: [],
		largeImage: '',
		tags: '',
		showModal: false,
		status: Status.IDLE,
		page: this.props.initialPage,
	};

	componentWillUpdate(prevProps, prevState) {
		const prevName = prevProps.quary;
		const currentName = this.props.quary;

		if (prevName !== currentName) {
			this.setState({ status: Status.PENDING, page: 1 }, () => {
				const page = this.state.page;

				fetchPictures(currentName, page).then(pictures => {
					if (
						pictures.data.totalHits !== 0 &&
						pictures.data.hits.length !== 0
					) {
						toast.success(
							`Hooray! We found ${pictures.data.totalHits} images.`
						);
					} else {
						toast.error(
							'Sorry, there are no images matching your search query. Please try again.'
						);
					}

					this.setState({
						pictures: [...pictures.hits],
						status: Status.RESOLVED,
					});
				});
			});
		}

		incrementPage = () => {
			this.setState(prevState => ({
				page: prevState.page + 1,
			})),
				() => {
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
								pictures: [...prevState.pictures, ...pictures.hits],
								status: Status.RESOLVED,
							}));
						})
						.catch(
							toast.info(
								"We're sorry, but you've reached the end of search results."
							)
						);
				};
		};
	}

	render() {
		const { status, pictures } = this.state;

		if (status === 'pending') {
			return (
				<>
					{Loading.circle('Loading...')}
					<ImageGallery pictures={pictures} />
				</>
			);
		}

		if (status === 'resolved') {
			return (
				<>
					{Loading.remove}
					<ImageGallery pictures={pictures} />
				</>
			);
		}
	}
}
