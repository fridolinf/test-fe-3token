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

//Is Active

export const changeIsActive = (id) => {
	return { type: 'REQUEST_CHANGE_ISACTIVE', id };
};
