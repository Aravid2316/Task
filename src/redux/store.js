import {
    combineReducers,
    configureStore,
    applyMiddleware,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import reducerfunction from './reducer';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
    key: 'root',
    storage: AsyncStorage
};
//const rootReducer = combineReducer(reducerfunction);

const persistedReducer = persistReducer(persistConfig, reducerfunction)
// const store = configureStore(persistedReducer, applyMiddleware(thunk))
const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
})

export const persister = persistStore(store)
export default store;
