import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {getCookie} from "./helpers/cookiesManager";

interface ApiResponse<T> {
    success: boolean;
    data?: any; // to be replaced soon
    error?: string;
}

export default class API {
    private instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: "https://limitless-lake-55070.herokuapp.com",
            timeout: 10000, // Adjust as needed
        });

        this.instance.interceptors.request.use(
            (config) => {
                const token = getCookie("token");
                if (token) {
                    config.headers["token"] = `${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.instance.interceptors.response.use(
            (response) => {
                return response;
            },
            (error) => {
                if (error.response) {
                    return Promise.reject(error.response.data);
                } else if (error.request) {
                    return Promise.reject(new Error("No response received from server"));
                } else {
                    return Promise.reject(error.message);
                }
            }
        );
    }

    public async getData<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response: AxiosResponse<T> = await this.instance.get(url, config);
            return {success: true, data: response.data};
        } catch (error) {
            return {success: false, error: error as string};
        }
    }

    public async postData<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response: AxiosResponse<T> = await this.instance.post(url, data, config);
            return {success: true, data: response.data};
        } catch (error) {
            return {success: false, error: error as string};
        }
    }

    public async putData<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response: AxiosResponse<T> = await this.instance.put(url, data, config);
            return {success: true, data: response.data};
        } catch (error) {
            return {success: false, error: error as string};
        }
    }

    public async deleteData<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response: AxiosResponse<T> = await this.instance.delete(url, config);
            return {success: true, data: response.data};
        } catch (error) {
            return {success: false, error: error as string};
        }
    }

    public async patchData<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        try {
            const response: AxiosResponse<T> = await this.instance.patch(url, data, config);
            return {success: true, data: response.data};
        } catch (error) {
            return {success: false, error: error as string};
        }
    }
}
