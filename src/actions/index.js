export const REQUEST_GIFS = 'REQUEST_GIFS';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export function requestGifs(term = null) {
	const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g, '+')}&api_key=dc6zaTOxFJmzC`;

	let data = fetch(url)
		.then((response) => response.json())
		.then((data) => data.data);

	return {
		type: REQUEST_GIFS,
		payload: data
	}
}

export function openModal(gif) {
	return {
		type: OPEN_MODAL,
		gif
	}
}

export function closeModal() {
	return {
		type: CLOSE_MODAL
	}
}
