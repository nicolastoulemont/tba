import React, { useContext } from 'react';
import { Spring } from 'react-spring/renderprops';
import DatesPicker from './DatesPicker';
import SBSuggestions from './sideBarSuggestions';
import SBPanel from './sideBarPanel';
import SBNoProfile from './sideBarNoProfile';
import { UserContext } from '../contexts';

const SideBar = ({ history }) => {
	const user = useContext(UserContext);
	const path = window.location.pathname;
	return (
		<div className="d-none d-lg-block col-lg-4 text-center">
			<div className="sticky">
				{path.includes('events') || path.includes('news') || path.includes('activities') ? (
					<Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
						{props => (
							<div className="row ml-2 mb-4" style={props}>
								<div className="col mx-auto bg-white px-2">
									<DatesPicker history={history} />
								</div>
							</div>
						)}
					</Spring>
				) : null}
				<div className="row ml-2 mb-4">
					<div className="col mx-auto bg-white px-2">
						<SBSuggestions />
					</div>
				</div>
				<div className="row">
					{user.profile[0] && !path.includes('activities') ? (
						<SBPanel />
					) : path.includes('activities') ? null : (
						<SBNoProfile />
					)}
				</div>
			</div>
		</div>
	);
};

export default SideBar;
