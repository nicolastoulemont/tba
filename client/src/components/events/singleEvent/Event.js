import React, { Fragment } from 'react';
import CQuery from '../../commons/CustomQueryComponent';
import EventAbout from './EventAbout';
import EventHeader from './EventHeader';
import EventSocial from './EventSocial';

import { GET_EVENT } from '../../graphql/event/Queries';

const Event = ({ user, eventId, history }) => {
  return (
    <CQuery query={GET_EVENT} variables={{ id: eventId }}>
      {({ data: { event }, refetch }) => {
        const {
          creator,
          creator: { profile }
        } = event;
        return (
          <Fragment key={event.id}>
            <EventHeader
              userId={event.userId}
              userAvatar={creator.avatar}
              loggedUser={user}
              history={history}
              refetch={refetch}
              eventId={event.id}
              name={event.name}
              description={event.description}
              location={event.location}
              ispublic={event.ispublic}
              userName={profile.name}
              userPosition={profile.position}
              userOrganisation={profile.organisation}
              categoryOne={event.categoryOne}
              categoryTwo={event.categoryTwo}
              categoryThree={event.categoryThree}
              startDate={event.startDate}
              startTime={event.startTime}
              endDate={event.endDate}
              endTime={event.endTime}
            />
            <EventAbout description={event.description} />
            <EventSocial user={user} eventId={event.id} />
          </Fragment>
        );
      }}
    </CQuery>
  );
};

export default Event;
