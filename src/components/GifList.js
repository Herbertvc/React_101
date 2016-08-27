import React, { PropTypes } from 'react';

import GifItem from './GifItem';

// const propTypes = {
// 	gifs: PropTypes.arrayOf,
// }

const GifList = (props) => {
	const gifItems = props.gifs.map((image) => {
			return <GifItem 
				key={image.id}
				gif={image}
				onGifSelect={props.actions.openModal}
				onFavoriteSelect={props.actions.onFavoriteSelect}
				onFavoriteDeselect={props.actions.onFavoriteDeselect}
				isAuthenticated={props.actions.isAuthenticated}
				isFavorite={props.actions.isFavorite()}
			/>
	});

	return(
		<div className={'gif-list'}>{gifItems}</div>
	);
}

// GifList.propTypes = propTypes;

export default GifList;
