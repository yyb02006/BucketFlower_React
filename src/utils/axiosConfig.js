import axios from 'axios';
axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
	baseURL: `${process.env.REACT_APP_AXIOS_BASE_URL}`,
});

axiosInstance.interceptors.request.use(
	(config) => {
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	async (response) => {
		if (response.data === 'Expired') {
			const originalReq = response.config;
			const refresh = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/refreshtoken`
			);
			console.log(refresh);
			const originres = await axios.request(originalReq);
			return originres;
		}
		return response;
	},
	async (error) => {
		const originalReq = error.config;
		if (error.response.status === 401) {
			const refresh = await axios.get(
				`${process.env.REACT_APP_BASE_URL}/refreshtoken`
			);
			console.log(refresh);
			const originres = await axios.request(originalReq);
			return originres;
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
