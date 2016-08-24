import {combineReducers} from 'redux';
import {reducer as FormReducer} from 'redux-form';

import GifsReducer from './gifs';
import ModalReducer from './modal'

const rootReducer = combineReducers({
	form: FormReducer,
	gifs: GifsReducer,
	modal: ModalReducer,
});

export default rootReducer;
