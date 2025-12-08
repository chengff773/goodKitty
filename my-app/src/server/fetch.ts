/**
 * @file 接口请求工具
 */

import axios from 'axios';
import {BASE_URL} from '../constant';

interface ApiResponse<T = any> {
    status: number;
    message: string;
    data: T;
}

interface ApiRequestParams {
    url: string;
    method?: string;
    params?: object;
    data?: object;
}

const fetchInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000
});

export default async ({
    url,
    params={},
    method='post'
}) => {
    const config: ApiRequestParams = {
        url,
        method
    };
    if (method === 'get') {
        config.params = params;
    }
    else {
        config.data = params;
    }
    const res: ApiResponse = await fetchInstance.request(config);
    const {status, data, message} = res;
    if (status) {
        return data;
    }
    else {
        return Promise.reject(message);
    }
}