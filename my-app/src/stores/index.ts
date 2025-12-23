/**
 * @file 全局状态管理
 */

import {create as zustandCreate} from 'zustand';
import {devtools} from 'zustand/middleware';

const store = zustandCreate(
    devtools(
        (set, get) => ({
            sendTrigger: 0,
            uploadInfo: null, // 上传文件信息
            inputDisabled: false, // 输入框是否禁用
            connectStatus: false, // 是否连接成功
            localImgs: {}, // 本地图片缓存
            setSendTrigger: () => set((state: any) => ({
                sendTrigger: state.sendTrigger + 1}
            )),
            setUploadInfo: (info: any) => set({
                uploadInfo: info
            }),
            clearUploadInfo: () => set({
                uploadInfo: null
            }),
            setInputDisabled: (disabled: boolean) => set({
                inputDisabled: disabled
            }),
            setConnectStatus: (status: boolean) => set({
                connectStatus: status
            }),
            setLocalImgs: (imgs: {}) => set({
                localImgs: imgs
            })
        }),
        {
            name: 'store'
        }
    )
);

export default store;