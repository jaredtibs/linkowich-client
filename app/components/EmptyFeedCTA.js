import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/stylesheets/empty_feed_cta.scss';

class EmptyFeedCTA extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div className="empty-feed">
        <div className="add-icon-container">
          <i className="material-icons">group_add</i>
        </div>
        <div className="add-btn-container">
          <div className="add-header">
            LOOKS LIKE YOU NEED A BUDDY
          </div>
          <div className="add-btn">
            <Link to="/invite">
              INVITE A FRIEND
            </Link>
          </div>
        </div>
      </div>
    )
  }

}

export default EmptyFeedCTA;
