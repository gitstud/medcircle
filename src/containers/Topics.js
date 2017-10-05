import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchTopicsIfNeeded,
  subscribe,
} from '../actions';


class Topics extends Component {
  componentDidMount() {
    this.props.dispatch(fetchTopicsIfNeeded());
  }

  render() {
    const { topics } = this.props.state.topics;

    return (
      <div className="topics_page">
        <h1>Choose from the following topics</h1>
        <div className="topics_list">
          {topics.map((topic, i) => (
            <div key={i} className="topic_row">
              <div className="topic_title">{topic.name}</div>
              <button className={topic.following ? 'topic_unfollow' : 'topic_follow'} onClick={() => this.props.dispatch(subscribe(topic.id))}>
                {topic.following === true ? <span className="topic_plus">{`✔ `}</span> : <span className="topic_plus">{`+ `}</span>}
                {topic.following === true ? 'following' : 'follow'}
              </button>
            </div>
          ))}
        </div>
        <div className="topics_footer">
          <Link to="/">
            <button className="topics_submit">Done</button>
          </Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { topics, isFetching } = state;
  return {
    state,
    topics,
    isFetching,
  }
}

export default connect(mapStateToProps)(Topics)
