import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

export default class Posts extends Component {

  state = {
    redirect: false,
    postId: null,
  }

  render() {
    const { posts, topics } = this.props;
    let tops = {};
    if (topics.length > 0) {
      for (let i = 0; i < topics.length; i++) {
        tops[topics[i].id] = topics[i].following;
      }
    }

    if (this.state.redirect) {
      return <Redirect to={`articles/${this.state.postId}`} />
    }
    return (
      <div className="FeedContainer">
        <div className="Feed">
          {posts.map((post, i) => {
            for (let j = 0; j < post.topics.length; j++) {
              if (post.topics[j].id in tops && tops[post.topics[j].id] === false) {
                return false
              }
            }
            return (
              <div className="Post" key={i}>
                <div className="Post_body">
                  <Link className="Post_title" to={`articles/${post.id}`}>{post.title}</Link>
                  <span className="Post_source">{post.attribution.displayName}</span>
                  <span className="Post_date">
                    {new Date(post.createdAt).getMonth()}/{new Date(post.createdAt).getDay()}/{new Date(post.createdAt).getFullYear()}
                  </span>
                  {post.media && post.media[0] && post.media[0].url && <Link to={`articles/${post.id}`}>
                    <img className="Post_image" src={post.media[0].url} alt={post.slug} />
                  </Link>}
                  <p className="Post_summary">{post.summary.length > 0 && post.summary}</p>
                  <Link to={`articles/${post.id}`} style={{ width: '100%' }}>
                    <button className="Post_readButton">Read Full Article</button>
                  </Link>
                  <div className="Post_topics">
                    {post.topics && post.topics.map((top, i) => (
                      <div key={i}>{/*add topic links here*/}</div>
                    ))}
                  </div>
                </div>
                <div className="Post_actions">
                  <div className="action">Like</div>
                  <div className="action">Comment</div>
                  <div className="action">Share</div>
                  <div className="action">Save</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
