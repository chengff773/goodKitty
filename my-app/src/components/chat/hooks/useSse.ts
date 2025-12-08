/**
 * @file sse 服务
 */
import {useRef, useState} from 'react';
import SseService from "../../../server/sseService";

interface StreamInfo {
    id: string;
    token: string;
    isEnd: boolean;
    index: number;
    time: string;
}

const useSse = () => {
    const evtSource = useRef(null);
    const [isStreaming, setIsStreaming] = useState(false);

    // 关闭sse服务&流式状态更新
    const handleEvtClose = () => {
        if (evtSource.current && evtSource.current.handleClose) {
            evtSource.current.handleClose();
        }
        setIsStreaming(false);
    };

    const setupSse = (callback, endCallback) => {
        if (evtSource.current) {
            handleEvtClose();
        }
        const sseService = new SseService();
        sseService.handleTokenChange = (streamInfo: StreamInfo) => {
            const {isEnd} = streamInfo;
            if (isEnd) {
                endCallback();
                handleEvtClose();
            }
            else {
                callback(streamInfo);
            }
        };
        evtSource.current = sseService;
    };

    return {
        isStreaming,
        setupSse
    };
};

export default useSse;