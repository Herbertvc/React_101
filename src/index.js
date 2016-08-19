import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './components/SearchBar';
import GifList from './components/GifList';
import GifModal from './components/GifModal';

import './styles/app.css';

class App extends React.Component {
	state = {
		gifs: [],
		selectedGif: null,
		modalIsOpen: false
	};

	openModal = (gif) => {
		this.setState({
			modalIsOpen: true,
			selectedGif: gif
		});
	};

	closeModal = () => {
		this.setState({
			modalIsOpen: false,
			selectedGif: null
		});
	};

	handleTermChange = (term) => {
		const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g, '+')}&api_key=dc6zaTOxFJmzC`;

		fetch(url).then((response) => response.json()).then((data) => {this.setState({gifs: data.data})});
	};

	render() {
		const gifListActions = {
			openModal: this.openModal,
		};

		return (
			<div>
				<SearchBar
					onTermChange={this.handleTermChange}
				/>
				<GifList 
					gifs={this.state.gifs}
					actions={gifListActions}
				/>
				<GifModal
					modalIsOpen={this.state.modalIsOpen}
					selectedGif={this.state.selectedGif}
					onRequestClose={() => this.closeModal()}
				/>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
