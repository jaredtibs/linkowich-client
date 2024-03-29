import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/stylesheets/empty_feed_cta.scss';

class EmptyFeedCTA extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="empty-feed" style={{paddingTop: (this.props.topPadding || 0)}} >
        <div className="add-icon-container">
          <i className="material-icons">group_add</i>
        </div>
        <div className="add-btn-container">
          <div className="add-header">
            LOOKS LIKE YOU NEED A BUDDY
          </div>
          <Link className="invite-link-container" to="/invite">
            <div className="add-btn">
              INVITE FRIENDS
            </div>
          </Link>
        </div>
      </div>
    )
  }

}

export default EmptyFeedCTA;
