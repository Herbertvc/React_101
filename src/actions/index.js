import {browserHistory} from 'react-router';

export const REQUEST_GIFS = 'REQUEST_GIFS';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';

export function requestGifs(term = null) {
	const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g, '+')}&api_key=dc6zaTOxFJmzC`;

	let data = fetch(url)
		.then((response) => response.json())
		.then((data) => data.data);

	return {
		type: REQUEST_GIFS,
		payload: data,
	}
}

export function openModal(gif) {
	return {
		type: OPEN_MODAL,
		gif,
	}
}

export function closeModal() {
	return {
		type: CLOSE_MODAL,
	}
}

export function signInUser() {
	browserHistory.push('/favorites');

	return {
		type: SIGN_IN_USER,
	}
}

export function signOutUser() {
	browserHistory.push('/');
	return {
		type: SIGN_OUT_USER,
	}
}
