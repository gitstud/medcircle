import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchPostsIfNeeded,
} from '../actions';
import Posts from '../components/Posts';

class Articles extends Component {

  state = {
    value: '',
  }
  componentDidMount() {
    this.props.dispatch(fetchPostsIfNeeded());
  }

  render() {
    const { posts, topics } = this.props.state;

    return (
      <div className="Articles">
        <div className="Articles_title">
          <h1 className="Articles_title__big">Bringing you the best health information.</h1>
          <p className="Articles_titleText">{`Follow topics you're interested in and we'll curate the best\n articles from trusted sources. we've selected some for you.`}</p>

          <p className="Articles_titleText">Get started to customize your feed</p>
          <Link to="topics">
            <button className="Articles_button__topic">Choose Topics</button>
          </Link>
        </div>
        <Posts posts={posts.posts} topics={topics.topics} />
        <div className="footer">
          <h1>Subsribe for the latest content</h1>
          <form className="form_subscribe">
            <input
              className="form_input focus"
              type="text"
              onChange={(e) => this.setState({value: e.target.value})}
              value={this.state.value}
              placeholder="Email"
            />
            <button className="form_submit" onClick={() => alert('Thank you!')}>Join</button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { posts, isFetching } = state;
  return {
    state,
    posts,
    isFetching,
  }
}

export default connect(mapStateToProps)(Articles)
