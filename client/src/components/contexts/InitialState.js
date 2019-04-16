export const InitialState = {
	stateEvent: {
		name: '',
		abstract: '',
		banner_URL: null,
		description: '',
		isPublic: true,
		city: '',
		address: '',
		start: new Date(),
		end: new Date(),
		tags: ['']
	}
};

export const Reducer = (state, action) => {
	switch (action.type) {
		case 'addEvent':
			return {
				...state,
				stateEvent: action.newEvent
			};

		case 'resetEvent':
			return {
				...state,
				stateEvent: {
					name: '',
					abstract: '',
					banner_URL: null,
					description: '',
					isPublic: true,
					city: '',
					address: '',
					start: new Date(),
					end: new Date(),
					tags: ['']
				}
			};

		default:
			return state;
	}
};
