/**
 * @file chat对话组件
 */

import { useRef, useEffect, useState, useLayoutEffect, forwardRef, useImperativeHandle } from "react";
import useChatStore from "@/stores/chatStore";
import useStore from "@/stores";
import {userMsg, agentMsg} from '@/utils/message';
import fetch from "@/server/fetch";
import useSse from "../../hooks/useSse";
import UserMsg from "./components/userMsg";
import AgentMsg from "./components/agentMsg";
import WelcomeMsg from "./components/welcomeMsg";
import MsgLoading from './components/msgLoading';
import SplitLine from "./components/sliptLine";
import "./style.less";

// loading等待最长时间，超过这个时间loading效果消失 30秒
const LOADING_OUT_TIME = 1000 * 30;

const Chat = forwardRef((props, ref) => {
    const [memoryTime, setMemoryTime] = useState('');
    const [memoryList, setMemoryList] = useState([]);
    const [msgList, setMsgList] = useState([]);
    const [showLoading, setShowLoading] = useState(false);

    const msgAreaRef = useRef(null);
    const msgListRef = useRef(msgList);
    const isWaittingSseToken = useRef(false);

    const {chatHistoryList, setChatHistoryList} = useChatStore(); 
    const {
        uploadInfo
    } = useStore();
    const {setupSse} = useSse();

    // 向外披露方法
    useImperativeHandle(ref, () => ({
        // 发送信息
        sendMsg: async (inputValue) => {
            // 显示loading效果
            setShowLoading(true);

            // 存储用户消息到历史消息中
            const {filename = ''} = uploadInfo || {};
            const newUserMsg = userMsg(inputValue, filename);
            const curUserMsgId = newUserMsg.id;
            setMsgList([...msgList, newUserMsg]);
            return new Promise((resolve, reject) => 
                fetch({
                    url: 'chat',
                    params: {
                        input: inputValue
                    }
                }).then(res => {
                    const {time} = res;
                    // 开始等待后端返回流式token
                    isWaittingSseToken.current = true;
                    // 更新用户消息中的time字段
                    setMsgList(prev => {
                        const newMsgList = prev.map(msg => {
                            if (msg.id === curUserMsgId) {
                                return {
                                    ...msg,
                                    time
                                }
                            }
                            return msg;
                        });
                        return [...newMsgList];
                    });
                    // 历史记录
                    setChatHistoryList({...newUserMsg, time});
                    // 初始化sse连接-监听流式消息
                    setupSse(handleTokenChange, handleSseClose);
                    resolve();
                })
                .catch(() => {
                    // 标记消息异常
                    setMsgList(prev => prev.map(msg => {
                        if (msg.id === curUserMsgId) {
                            return {
                                ...msg,
                                isError: true
                            }
                        }
                        return msg;
                    }));
                    setChatHistoryList({...newUserMsg, isError: true});
                    reject();
                })
            )
        }
    }));

    // sse接收token
    const handleTokenChange = streamInfo => {
        const {token = '', id, time} = streamInfo || {};
        if (!token) return;
        // 接收到第一条token
        if (isWaittingSseToken.current) {
            // 隐藏loading效果
            setShowLoading(false);
            isWaittingSseToken.current = false;
            // 新建agent消息
            const newAgentMsg = agentMsg({
                content: token,
                id,
                time
            });
            setMsgList(prev => ([...prev, newAgentMsg]));
            return;
        }
        else {
            // 接收到后续token，直接塞在最后一条消息的content中
            setMsgList(prev => {
                if (prev.length === 0) return prev;
                return prev.map(msg =>
                    msg.id === id
                    ? {
                        ...msg,
                        content: msg.content + token
                    }
                    : { ...msg }
                )
            });
        }
    };

    // sse关闭
    const handleSseClose = () => {
        const curMsgList = msgListRef.current;
        const msgLastIndex = curMsgList.length - 1;
        const newMsg = curMsgList[msgLastIndex];
        // 更新消息中的isEnd字段
        const newMsgList = curMsgList.map((msg, index) => 
            index === msgLastIndex
            ? {
                ...msg,
                isEnd: true
            }
            : { ...msg }
        )
        setMsgList(newMsgList);
        // 存储agent消息到历史消息中
        setChatHistoryList({...newMsg, isEnd: true});
    };

    // token直接更新msgList监听不到，需要使用useRef来监听
    useEffect(() => {
        // 更新msgListRef中的值
        msgListRef.current = msgList;
    }, [msgList]);

    useEffect(() => {
        // 自动滚动
        msgAreaRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [msgList]);

    // 组件初始化
    useEffect(() => {
        // 加载历史消息
        if (chatHistoryList) {
            const lastMsgIndex = chatHistoryList.findLastIndex(msg => !msg.isError);
            const time = chatHistoryList[lastMsgIndex]?.time;
            setMemoryTime(time);
            setMemoryList([...chatHistoryList]);
        }
    }, []);

    useLayoutEffect(() => {
        if (msgAreaRef && msgAreaRef.current) {
            msgAreaRef.current?.scrollIntoView({
                behavior: 'auto',
                block: 'end'
            });
        }
    }, [memoryList]);

    useEffect(() => {
        let timer = null;
        if (showLoading) {
            timer = setTimeout(() => {
                setShowLoading(false);
                clearTimeout(timer);
            }, LOADING_OUT_TIME);
        }
        return () => {
            clearTimeout(timer);
        }
    }, [showLoading]);

    return (
        <div className="msg-area">
            {memoryList.length
                ?(
                    <>
                        <div className="msg-list">
                            {
                                memoryList.map(msgInfo => {
                                    const {type, id} = msgInfo;
                                    return type === 'user'
                                        ? <UserMsg key={id} {...msgInfo} />
                                        : <AgentMsg key={id} {...msgInfo} />;
                                })
                            }
                        </div>
                        <SplitLine time={memoryTime} />
                        <WelcomeMsg />
                    </>
                )
                : null
            }
            <div className="msg-list">
                {
                    msgList.map(msgInfo => {
                        const {type, id} = msgInfo;
                        return type === 'user'
                            ? <UserMsg key={id} {...msgInfo} />
                            : <AgentMsg key={id} {...msgInfo} />;
                    })
                }
                {showLoading ? <MsgLoading /> : null}
            </div>
            <div ref={msgAreaRef} />
        </div>
    );
});

export default Chat;