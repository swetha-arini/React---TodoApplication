import reducer from './reducer';
import { createStore ,applyMiddleware, compose} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { loadState, saveState } from './localstorage';

const persistedState = loadState();

const store = createStore(
    reducer,
    composeWithDevTools()
    // other store enhancers if any
);
  
export default store