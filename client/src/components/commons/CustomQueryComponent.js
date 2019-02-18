import React from 'react';
import Spinner from './Spinner';
import { DashboardError } from './UserActionsComponents';
import { Query } from 'react-apollo';

const CQuery = props => {
  return (
    <Query {...props}>
      {({ loading, error, ...otherProps }) => {
        if (loading) return <Spinner />;
        if (error) return <DashboardError />;
        return props.children(otherProps);
      }}
    </Query>
  );
};

export default CQuery;
