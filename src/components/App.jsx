// import PropTypes from 'prop-types'
import { Container } from 'components/Container';
import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';

export class App extends Component {
	state = {
		quary: null,
	};

	handleFormSubmit = quary => {
		this.setState({ quary });
	};

	render() {
		return (
			<>
				<ToastContainer onClose={3000} />
				<Container>
					<Searchbar onSubmit={this.handleFormSubmit} />
					<ImageGallery quary={this.state.quary} />
				</Container>
			</>
		);
	}
}
