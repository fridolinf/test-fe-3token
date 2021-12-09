const initialState = {
	data: [],
	loading: false,
	error: null,
};

const dataReducers = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
		case 'GET_DATA_REQUEST':
			return {
				...state,
				data: [],
				loading: true,
			};
		case 'GET_DATA_SUCCESS':
			return {
				loading: false,
				data: action.payload,
				error: null,
			};
		case 'ADD_DATA_SUCCESS':
			return {
				loading: false,
				data: [...state.data, action.payload],
				error: null,
			};
		case 'DELETE_DATA_SUCCESS':
			return {
				loading: false,
				data: state.data.filter((item) => item.id !== action.id),
			};
		case 'CHANGE_ISACTIVE_SUCCESS':
			return {
				...state,
				loading: false,
				error: null,
			};
	}
};

export default dataReducers;
