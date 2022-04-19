import { baseApiURL } from './environment';
import axios from 'axios';
const axiosInstance = async () => {
	const instance = axios.create({
		baseURL: baseApiURL,
	});
	return instance;
};


const parseResponse = (response) => {
	try {
		const data = JSON.parse(response);
		if (data?.errors) {
			return {
				remote: "failure",
				error: {
					errors: data.errors,
				},
			};
		}
		return {
			remote: "success",
			data: data,
		};
	} catch (error) {
		return {
			remote: "failure",
			error: {
				errors: response,
			},
		};
	}
};

export const apiRoot = async (reqParams) => {
	try {
		const accessToken = localStorage.getItem("token");
		const instance = await axiosInstance();
		reqParams.headers = {
			"Content-Type": "application/json"
		};
		if (accessToken) {
			reqParams.headers.Authorization = `Bearer ${accessToken}`;
		}
		const response = await instance.request({
			...reqParams,
			transformResponse: (res) => {
				const resp = parseResponse(res);
				return resp.remote === "success" ? resp.data : resp;

			},

		});
		//console.log("response", response)
		if (response.data.status === false && response.data.statusCode === 401) {
			// localStorage.removeItem("token");
		}
		return {
			remote: "success",
			data: response.data,
		};
	} catch (error) {

		if (error) {
			if (error?.response) {
				const axiosError = error;
				if (axiosError?.response?.data) {
					let errorMessage = axiosError?.response?.data?.errors;
					if (axiosError?.response?.status === 500) {
						errorMessage = "Internal Server Error";
					} else if (axiosError?.response?.status === 401) {
						errorMessage = "Forbidden";
					} else {
						errorMessage =
							error?.response?.data?.error?.errors ||
							axiosError?.response?.data;
					}
					return {
						remote: "failure",
						errors: {
							status: axiosError?.response?.status,
							errors: errorMessage,
						},
					};
				}
			}
		} else {
			const axiosError = error;
			let errorMessage = axiosError.message;
			if (errorMessage === "Network Error") {
				errorMessage = "No internet connection";
			}
			return {
				remote: "failure",
				errors: {
					errors: errorMessage,
				},
			};
		}
		throw error;
	}
}