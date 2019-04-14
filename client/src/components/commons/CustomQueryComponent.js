import React from 'react';
import Spinner from './Spinner';
import { FetchError } from './UserActionsComponents';
import { Query } from 'react-apollo';

const CQuery = props => (
	<Query {...props}>
		{({ loading, error, ...otherProps }) => {
			if (loading) return <Spinner />;
			if (error) return <FetchError />;
			return props.children(otherProps);
		}}
	</Query>
);

export default CQuery;
