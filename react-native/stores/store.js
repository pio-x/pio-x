import { createStore } from 'redux';
import rootReducer from './rootReducer';

// make store instance available outside of react
const store = createStore(rootReducer);

export default store;
