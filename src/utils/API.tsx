import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export default class API {
    private instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: "https://fakestoreapi.com",
            timeout: 10000, // Adjust as needed
        });

        this.instance.interceptors.request.use(
            (config) => {
                const token = this.getTokenFromCookie();
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.instance.interceptors.response.use(
            (response) => {
                return response.data;
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

    private getTokenFromCookie(): string | null {
        return document.cookie.replace(/(?:^|.*;\s*)token\s*\\=\s*([^;]*).*$|^.*$/, "$1") ?? null;
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
