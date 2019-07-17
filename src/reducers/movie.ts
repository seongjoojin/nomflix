
import produce from 'immer';

export const initialState = {
    movieList: []
}

export const LOAD_MOVIE_LIST_REQUEST = 'LOAD_MOVIE_LIST_REQUEST';
export const LOAD_MOVIE_LIST_SUCCESS = 'LOAD_MOVIE_LIST_SUCCESS';
export const LOAD_MOVIE_LIST_FAILURE = 'LOAD_MOVIE_LIST_FAILURE';

export default (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case LOAD_MOVIE_LIST_REQUEST: {
                draft.movieList = !action.lastId ? [] : draft.movieList;
                break;
            }
            case LOAD_MOVIE_LIST_SUCCESS: {
                action.data.map((data) => {
                    draft.movieList.push(data);
                });
                break;
            }
            case LOAD_MOVIE_LIST_FAILURE: {
                break;
            }
        }
    });
}