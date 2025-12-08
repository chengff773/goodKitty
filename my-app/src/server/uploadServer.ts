/**
 * @file 文件上传请求服务
 */

import axios from 'axios';
import {BASE_URL} from '../constant';

interface ApiResponse<T = any> {
    status: number;
    message: string;
    data: T;
}

const fetchInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000
});

export default async ({
    file=null
}) => {
    if (!file) {
        return Promise.reject('文件不能为空');
    }
    // 创建表单数据
    const formData = new FormData();
    formData.append('file', file);

    const res: ApiResponse = await fetchInstance.request({
        url: 'upload',
        method: 'POST',
        data: formData
    });
    const {status, data, message} = res;
    if (status) {
        return data;
    }
    else {
        return Promise.reject(message);
    }
}