import { configureStore } from 'redux';
import rootReducer from './reducers/rootReducer';

export default function store() {
    return configureStore(
        rootReducer
    );
}