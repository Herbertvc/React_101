import {combineReducers} from 'redux';
import {reducer as FormReducer} from 'redux-form';

import GifsReducer from './gifs';
import ModalReducer from './modal'
import AuthReducer from './auth';

const rootReducer = combineReducers({
	auth: AuthReducer,
	form: FormReducer,
	gifs: GifsReducer,
	modal: ModalReducer,
});

export default rootReducer;
