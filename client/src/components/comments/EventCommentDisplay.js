import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Mutation } from 'react-apollo';
import { MODERATE_COMMENT } from '../graphql/comment/Mutations';
import { RespSmallAvatarLink, UserNameLink } from '../commons/CustomLinks';
import EventCommentActions from './commentActions/EventCommentActions';

const EventCommentDisplay = ({
  id,
  text,
  creatorName,
  creatorId,
  creatorAvatar,
  refetch,
  user,
  eventId,
  eventCreator,
  edited,
  moderated
}) => {
  return (
    <div className="list-group-item border-0 py-1 px-2" key={id}>
      <div className="row">
        <div className="col-1">
          <RespSmallAvatarLink id={creatorId} avatar={creatorAvatar} />
        </div>
        <div className="col-9 col-md-10 mx-0 pr-0 pl-1">
          <div className="text-left mx-auto">
            <UserNameLink id={creatorId} name={creatorName} />
            {moderated ? (
              <Fragment>
                <small className="d-none d-md-inline-block font-italic ml-2">
                  {text}
                </small>
                <small className="d-inline-block d-md-none font-italic ml-4">
                  {text}
                </small>
              </Fragment>
            ) : (
              <Fragment>
                <span className="d-none d-md-inline-block ml-2">{text}</span>
                <span className="d-inline-block d-md-none ml-4">{text}</span>
              </Fragment>
            )}
            {moderated ? null : (
              <EventCommentActions
                user={user}
                creatorId={creatorId}
                commentId={id}
                commentText={text}
                refetch={refetch}
                edited={edited}
              />
            )}
          </div>
        </div>
        <div className="col-1 mx-0">
          {user === creatorId || eventCreator ? (
            <Mutation mutation={MODERATE_COMMENT}>
              {(deleteComment, e) => (
                <Link
                  to="#"
                  className="m-0 p-0 text-right"
                  onClick={e => {
                    e.preventDefault();
                    deleteComment({
                      variables: {
                        _id: id,
                        userId: user,
                        eventId
                      }
                    }).then(res => {
                      refetch();
                    });
                  }}
                >
                  {user === creatorId ? (
                    <i className="fa fa-times mx-0" aria-hidden="true" />
                  ) : user === eventCreator ? (
                    <i className="fas fa-ban mx-0" aria-hidden="true" />
                  ) : null}
                </Link>
              )}
            </Mutation>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default EventCommentDisplay;
