import React from 'react';
import PublicSuggestionPanel from './PublicSuggestions';

const PublicSideBar = () => {
	return (
		<div className="sticky">
			<div className="row ml-2 mb-4">
				<div className="col mx-auto bg-white px-2 py-2">
					<PublicSuggestionPanel />
				</div>
			</div>
			<div className="row ml-2 mb-4">
				<div className="col mx-auto bg-white px-2 py-2">Autre</div>
			</div>
		</div>
	);
};

export default PublicSideBar;
