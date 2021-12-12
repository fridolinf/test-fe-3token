const baseUrl = 'https://60cb2f6921337e0017e440a0.mockapi.io';

export const api = {
	getProducts: () => `${baseUrl}/product`,
	addProducts: () => `${baseUrl}/product`,
	getDetailProducts: (id) => `${baseUrl}/product/${id}`,
	delProducts: (id) => `${baseUrl}/product/${id}`,
	updateProducts: (id) => `${baseUrl}/product/${id}`,
};
