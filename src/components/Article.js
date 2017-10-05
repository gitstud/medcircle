import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchArticle,
} from '../actions';

class Article extends Component {
  componentDidMount() {
    this.props.dispatch(fetchArticle(this.props.match.params.id));
  }

  render() {
    const { articles } = this.props.state;
    const { article } = articles;

    return (
      <div>
        <div className="article">
          {article && article.map((article, i) => {
            return (<div
              key={i}
              style={{
                maxWidth: '1200px',
                marginLeft: 'auto',
                marginRight: 'auto',
                padding: '25px',
              }}
            >
              <div>
                <h1>{article.title}</h1>
                <a href={article.url} target="_blank"><span className="Post_source">{article.attribution.displayName}</span></a>
                <span className="Post_date">
                  {new Date(article.createdAt).getMonth()}/{new Date(article.createdAt).getDay()}/{new Date(article.createdAt).getFullYear()}
                </span>
                {/*article.media && article.media[0] && article.media[0].url && (
                  <img className="Post_image" src={article.media[0].url} alt={article.slug} />
                )*/}
                <p className="Post_summary">{article.summary.length > 0 && article.summary}</p>
                <div className="Post_topics">
                  {article.topics && article.topics.map((top, i) => (
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
          )})}
          {!articles.article && <div style={{textAlign: 'center', color: 'grey'}}>Sorry, this article is no longer available</div>}
        </div>
        <div className="article_buttonContainer">
          <Link to="/">
            <button className="article_button">Back to Articles</button>
          </Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { article } = state;
  return {
    state,
    article,
  }
}

export default connect(mapStateToProps)(Article)
