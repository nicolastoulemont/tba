const Report = require('../models/Report');
const isEmpty = require('./is-empty');
const Validator = require('validator');

const ValidateAddReport = async data => {
  let errors = [];

  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 5, max: 500 })) {
    let reportTextError = {
      path: 'text',
      message: 'The report  must be between 5 and 500 characters'
    };
    errors.push(reportTextError);
  }

  if (data.eventId) {
    const EventReported = await Report.findOne({
      eventId: data.eventId,
      userId: data.userId
    });
    if (EventReported) {
      let EventReportedError = {
        path: 'event',
        message: 'You already reported this event'
      };
      errors.push(EventReportedError);
    }
  }

  if (data.commentId) {
    const CommentReported = await Report.findOne({
      commentId: data.commentId,
      userId: data.userId
    });
    if (CommentReported) {
      let CommentReportedError = {
        path: 'comment',
        message: 'You already reported this comment'
      };
      errors.push(CommentReportedError);
    }
  }

  if (data.organisationId) {
    const OrganisationReported = await Report.findOne({
      organisationId: data.organisationId,
      userId: data.userId
    });
    if (OrganisationReported) {
      let OrganisationReportedError = {
        path: 'organisation',
        message: 'You already reported this organisation'
      };
      errors.push(OrganisationReportedError);
    }
  }

  if (data.pollId) {
    const PollReported = await Report.findOne({
      pollId: data.pollId,
      userId: data.userId
    });
    if (PollReported) {
      let PollReportedError = {
        path: 'poll',
        message: 'You already reported this poll'
      };
      errors.push(PollReportedError);
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = { ValidateAddReport };
