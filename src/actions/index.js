import {browserHistory} from 'react-router';
import Firebase from 'firebase';

export const REQUEST_GIFS = 'REQUEST_GIFS';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';

const ref = new Firebase('https://react-giphy-tutorial.firebaseio.com');

export function requestGifs(term = null) {
	const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g, '+')}&api_key=dc6zaTOxFJmzC`;
	return function(dispatch) {
		let data = fetch(url)
			.then(response => response.json())
			.then(data => {
				dispatch({
					type: REQUEST_GIFS,
					payload: data.data
				});
			})
	}
	// return {
	// 	type: REQUEST_GIFS,
	// 	payload: data,
	// }
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

export function signUpUser(credentials) {
	return function(dispatch) {
		ref.createUser({
			email: credentials.email,
			password: credentials.password,
		}, function (error, userData) {
			if (error) {
				dispatch(authError(error));
			} else {
				dispatch(signInUser(credentials));
			}
		});
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

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error,
	}
}
