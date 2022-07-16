import axios from 'axios';

const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(
	async config => {
		const token = JSON.parse(localStorage.getItem('token'));
		if (token?.acessToken) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${token.acessToken}`,
			};
		}
		return config;
	},
	error => {
		Promise.reject(error);
	}
);

api.interceptors.response.use(
	r => r,
	async error => {
		const originalRequest = error.config;
		const token = JSON.parse(localStorage.getItem('token'));
		if (
			token?.acessToken &&
			(error?.response?.status === 403 || error?.response?.status === 401) &&
			!originalRequest._retry &&
			originalRequest.url !== 'token/refresh/' &&
			error?.response.status !== 500
		) {
			originalRequest._retry = true;

			const newAcessToken = await api.post('token/refresh/', {
				refresh: token.refreshToken,
			});
			window.localStorage.setItem(
				'token',
				JSON.stringify({
					acessToken: newAcessToken.data.access,
					refreshToken: token.refreshToken,
				})
			);
			axios.defaults.headers.common.Authorization = `Bearer ${newAcessToken.data.access}`;

			return api(originalRequest);
		}
		return Promise.reject(error);
	}
);

export default api;
