import fetch from 'isomorphic-fetch';

export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SUBSCRIBE = 'SUBSCRIBE';
export const REQUEST_TOPICS = 'REQUEST_TOPICS';
export const RECEIVE_TOPICS = 'RECEIVE_TOPICS';
export const REQUEST_ARTICLE = 'REQUEST_ARTICLE';
export const RECEIVE_ARTICLE = 'RECEIVE_ARTICLE';

export function subscribe(topic) {
  return {
    type: SUBSCRIBE,
    topic,
  }
}

function receiveArticle(json) {
  return {
    type: RECEIVE_ARTICLE,
    article: json.data,
  }
}

export function fetchArticle(id) {
  return dispatch => {
    return fetch(`https://medcircle-coding-project.s3.amazonaws.com/api/articles/${id}.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveArticle(json)))
  }
}

function requestPosts() {
  return {
    type: REQUEST_POSTS,
  }
}

function receivePosts(json) {
  return {
    type: RECEIVE_POSTS,
    posts: json.data,
  }
}

function fetchPosts() {
  return dispatch => {
    dispatch(requestPosts());
    return fetch(`https://medcircle-coding-project.s3.amazonaws.com/api/articles.json`)
      .then(response => response.json())
      .then(json => dispatch(receivePosts(json)))
  }
}

function shouldFetchPosts(state) {
  const posts = state.posts.posts;
  if (posts.length < 1) {
    return true;
  } else if (posts.isFetching) {
    return false;
  } else {
    return false;
  }
}

export function fetchPostsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState())) {
      return dispatch(fetchPosts());
    }
  }
}

function requestTopics() {
  return {
    type: REQUEST_TOPICS,
  }
}

function receiveTopics(json) {
  return {
    type: RECEIVE_TOPICS,
    topics: json.data.map(item => {
      item.following = true;
      return item;
    }),
  }
}

function fetchTopics() {
  return dispatch => {
    dispatch(requestTopics());
    return fetch(`https://medcircle-coding-project.s3.amazonaws.com/api/topics.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveTopics(json)))
  }
}

function shouldFetchTopics(state) {
  const topics = state.topics.topics;
  if (topics.length < 1) {
    return true;
  } else if (topics.isFetching) {
    return false;
  } else {
    return false;
  }
}

export function fetchTopicsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchTopics(getState())) {
      return dispatch(fetchTopics());
    }
  }
}
