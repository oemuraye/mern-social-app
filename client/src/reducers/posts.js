import { FETCH_POST, FETCH_ALL, FETCH_BY_SEARCH, START_LOADING, END_LOADING, CREATE, UPDATE, COMMENT, DELETE, LIKE } from '../constants/actionTypes';

const postReducers = (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
      case START_LOADING:
        return { ...state, isLoading: true};
      case END_LOADING:
        return { ...state, isLoading: false};
      case FETCH_ALL:
        return {
          ...state,
          posts: action.payload.data,
          currentPage: action.payload.currentPage,
          numberOfPages: action.payload.numberOfPages,
        };
      case FETCH_POST:
        return {...state, post: action.payload };
      case FETCH_BY_SEARCH:
        return {...state, posts: action.payload.data };
      case CREATE:
        return { ...state, posts: [...state.posts, action.payload] };
      case UPDATE:
      case LIKE:
        return { ...state, posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        )};
      case COMMENT:
        return { ...state, posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
          // another way to do this
          // if (post._id === action.payload._id) {
            // change the post that just received a comment
            //   return action.payload;
            // }
            // return all the other posts normally
          // return post;
        )}
      case DELETE:
        return { ...state, posts: state.posts.filter((post) => post._id !== action.payload)};
      default:
        return state;
    }
}

export default postReducers;