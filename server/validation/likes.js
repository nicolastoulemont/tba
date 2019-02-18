const Like = require('../models/Like');
const isEmpty = require('./is-empty');

const ValidateAddLike = async data => {
  let errors = [];

  if (data.eventId) {
    const EventLiked = await Like.findOne({
      eventId: data.eventId,
      userId: data.userId
    });
    if (EventLiked) {
      let EventLikedError = {
        path: 'event',
        message: 'You already liked this event'
      };
      errors.push(EventLikedError);
    }
  }

  if (data.commentId) {
    const CommentLike = await Like.findOne({
      commentId: data.commentId,
      userId: data.userId
    });
    if (CommentLike) {
      let CommentLikedError = {
        path: 'comment',
        message: 'You already liked this comment'
      };
      errors.push(CommentLikedError);
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = { ValidateAddLike };
