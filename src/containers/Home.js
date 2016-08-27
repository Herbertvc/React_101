import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as Actions from '../actions';

import GifsTemp from '../components/GifsTemp';
import SearchBar from '../components/SearchBar';
import GifList from '../components/GifList';
import GifModal from '../components/GifModal';

import '../styles/app.css';

class Home extends React.Component {
	openModal = (selectedGif) => {
		this.props.actions.openModal({selectedGif});
	}

	closeModal = () => {
		this.props.actions.closeModal();
	}

	onFavoriteSelect = (selectedGif) => {
		this.props.actions.favoriteGif({selectedGif});
	}

	onFavoriteDeselect = (selectedGif) => {
		this.props.actions.unfavoriteGif({selectedGif});
	}

	isAuthenticated = () => {
		this.props.actions.authenticated();
	}

	render() {
		const gifListActions = {
			openModal: this.openModal,
			onFavoriteSelect: this.onFavoriteSelect,
			onFavoriteDeselect: this.onFavoriteDeselect,
			isAuthenticated: this.isAuthenticated,
		}

		const gifModalActions = {
			closeModal: this.closeModal,
		}

		return (
			<div>
				<SearchBar onTermChange={this.props.actions.requestGifs} />
				<GifList
					gifs={this.props.gifs}
					actions={gifListActions}
				/>
				<GifModal
					modalIsOpen={this.props.modalIsOpen}
					selectedGif={this.props.selectedGif}
					actions={gifModalActions}
				/>
			</div>
		);
	}
}

function mapStateToProps (state) {
	return {
		gifs: state.gifs.data,
		modalIsOpen: state.modal.modalIsOpen,
		selectedGif: state.modal.selectedGif,
		authenticated: state.auth.authenticated,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(Actions, dispatch),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
