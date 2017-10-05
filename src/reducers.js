import { combineReducers } from 'redux';
import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_TOPICS,
  RECEIVE_TOPICS,
  SUBSCRIBE,
  RECEIVE_ARTICLE,
} from './actions';

function posts(
  state = {
    isFetching: false,
    posts: [],
  },
  action
) {
  switch (action.type) {
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        posts: action.posts,
      })
    default:
      return state;
  }
}

function topics(
  state = {
    isFetching: false,
    topics: [],
  },
  action
) {
  switch (action.type) {
    case REQUEST_TOPICS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_TOPICS:
      return Object.assign({}, state, {
        isFetching: false,
        topics: action.topics,
      })
    case SUBSCRIBE:
      let subs = [...state.topics];
      let index;
      subs.find((element, i) => {
        if (element.id === action.topic) {
          index = i;
          return false
        }
        return false
      });
      subs[index].following = !subs[index].following;

      return Object.assign({}, state, {
        isFetching: false,
        topics: subs,
      })
    default:
      return state;
  }
}

function articles(state = {}, action) {
  switch (action.type) {
    case RECEIVE_ARTICLE:
      return Object.assign({}, state, {
        article: action.article,
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  posts,
  topics,
  articles,
})


export default rootReducer;
