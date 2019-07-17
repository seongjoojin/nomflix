import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import movie from './movie';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/'

export default function* rootSaga() {
    yield all([
        fork(movie),
    ])
}