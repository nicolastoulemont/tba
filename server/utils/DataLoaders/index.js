const Dataloader = require('dataloader');
const models = require('../../models');
const { batchUsers } = require('./BatchFunctions/general');
const {
	batchUserProfiles,
	batchUserEvents,
	batchUserComments,
	batchUserLikes,
	batchUserReports
} = require('./BatchFunctions/user');
const {
	batchEventComments,
	batchEventLikes,
	batchEventReports,
	batchEventRegistrations
} = require('./BatchFunctions/event');

const { batchRegistrationsEvent } = require('./BatchFunctions/registration');

// GENERAL
const usersLoader = new Dataloader(ids => batchUsers(ids, models));

// USER LOADERS
const userProfilesLoader = new Dataloader(ids => batchUserProfiles(ids, models));
const userEventsLoader = new Dataloader(ids => batchUserEvents(ids, models));
const userCommentsLoader = new Dataloader(ids => batchUserComments(ids, models));
const userLikesLoader = new Dataloader(ids => batchUserLikes(ids, models));
const userReportsLoader = new Dataloader(ids => batchUserReports(ids, models));

// EVENT LOADERS
const eventCommentsLoader = new Dataloader(ids => batchEventComments(ids, models));
const eventLikesLoader = new Dataloader(ids => batchEventLikes(ids, models));
const eventReportsLoader = new Dataloader(ids => batchEventReports(ids, models));
const eventRegistrationsLoader = new Dataloader(ids => batchEventRegistrations(ids, models));

// REGISTRATION LOADERS
const registrationEventLoader = new Dataloader(ids => batchRegistrationsEvent(ids, models));

module.exports = {
	usersLoader,
	userProfilesLoader,
	userEventsLoader,
	userCommentsLoader,
	userLikesLoader,
	userReportsLoader,
	eventCommentsLoader,
	eventLikesLoader,
	eventReportsLoader,
	eventRegistrationsLoader,
	registrationEventLoader
};
