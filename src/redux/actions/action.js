export const getData = () => {
	return {
		type: 'GET_DATA_REQUEST',
	};
};

export const delData = (id) => {
	return {
		type: 'DELETE_DATA_REQUEST',
		payload: id,
	};
};

export const addData = (data) => {
	return {
		type: 'ADD_DATA_REQUEST',
		payload: data,
	};
};

export const updateData = (data, id) => {
	return { type: 'UPDATE_DATA_REQUEST', payload: data, id };
};
