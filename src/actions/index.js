import {browserHistory} from 'react-router';
import Firebase from 'firebase';

export const REQUEST_GIFS = 'REQUEST_GIFS';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const FETCH_FAVORITED_GIFS = 'FETCH_FAVORITED_GIFS';
export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
export const AUTH_ERROR = 'AUTH_ERROR';

// const ref = new Firebase('https://react-giphy-tutorial.firebaseio.com');

const config = {
  apiKey: "AIzaSyDx7O4Jwlo78RSvwJtQtWmUdmZ1LOcw7Nw",
  authDomain: "react-giphy-tutorial.firebaseapp.com",
  databaseURL: "https://react-giphy-tutorial.firebaseio.com",
  storageBucket: "react-giphy-tutorial.appspot.com",
};

const firebase = Firebase.initializeApp(config)

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
}

export function favoriteGif({selectedGif}) {
	let updates = {}

	updates['/favorite-gifs/' + firebase.auth().currentUser.uid + '/' + selectedGif.id ] = selectedGif

	return dispatch => firebase.database().ref().update(updates)
}

export function unfavoriteGif({selectedGif}) {
	return dispatch => firebase.database().ref('/favorite-gifs/' + firebase.auth().currentUser.uid + '/' + selectedGif.id).remove();
}

export function openModal(gif) {
	return {
		type: OPEN_MODAL,
		gif,
	}
}

export function fetchFavoritedGifs() {
	return function(dispatch) {
		const userRef = firebase.auth().currentUser;
		userRef.on('value', snapshot => {
			dispatch({
				type: FETCH_FAVORITED_GIFS,
				payload: snapshot.val(),
			})
		});
	}
}

export function closeModal() {
	return {
		type: CLOSE_MODAL,
	}
}

export function signUpUser(credentials) {
	return function(dispatch) {
		firebase.auth().createUserWithEmailAndPassword(credentials.email,credentials.password)
			.then(response => {
				dispatch(signInUser(credentials));
			})
			.catch(error => {
				dispatch(authError(error));
			});
	}
}

export function signInUser(credentials) {
	return function(dispatch) {
		firebase.auth().signInWithEmailAndPassword(credentials.email,credentials.password)
			.then(response => {
				dispatch({
					type: SIGN_IN_USER,
				})
				browserHistory.push('/favorites');
			})
			.catch(error => {
				dispatch(authError(error));
			})
	}

	// return {
	// 	type: SIGN_IN_USER,
	// }
}

export function authenticateUser() {
	return function (dispatch) {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				dispatch({
					type: SIGN_IN_USER,
				});
			}
			else {
				dispatch(signOutUser());
			}
		});
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
