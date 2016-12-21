import {combineReducers} from 'redux';
import {reducer as FormReducer} from 'redux-form';

import AuthReducer from './auth';
import GifsReducer from './gifs';
import ModalReducer from './modal'

const rootReducer = combineReducers({
	auth: AuthReducer,
	form: FormReducer,
	gifs: GifsReducer,
	modal: ModalReducer,
});

export default rootReducer;
