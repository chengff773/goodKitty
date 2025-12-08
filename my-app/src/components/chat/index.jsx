/**
 * @file chat对话组件
 */

import { useState, useRef, useEffect, useMemo } from "react";
import fetch from "@/server/fetch";
import useStore from "@/stores";
import useSse from "./hooks/useSse";
import MsgList from "./components/msgList";
import Header from "./components/header";
import ChatInput from "./components/chatInput";
import "./style.less";

const Chat = () => {
    const [inputValue, setInputValue] = useState("");
    const [isWaitting, setIsWaitting] = useState(false);
    const msgListRef = useRef(null);
    const {
        setSendTrigger,
        setInputDisabled,
        connectStatus,
        setConnectStatus
    } = useStore();
    const {isStreaming} = useSse();

    const btnDisable = useMemo(() => (
        !inputValue
        || isWaitting
        || isStreaming
    ), [inputValue, isWaitting, isStreaming]);

    // 点击按钮发送消息
    const handleSend = () => {
        if (inputValue) {
            setIsWaitting(true);
            setSendTrigger();
            msgListRef.current?.sendMsg(inputValue).finally(() => {
                setIsWaitting(false);
            });
            setInputValue("");
        }
    };

    useEffect(() => {
        // 输入框禁用状态
        setInputDisabled(isWaitting || !connectStatus);
    }, [isWaitting, connectStatus]);

    useEffect(() => {
        fetch({
            url: 'server',
            method: 'get'
        }).then(() => {
            setConnectStatus(true);
        });
    }, []);

    return (
        <div className="chat">
            <Header />
            <MsgList
                ref={msgListRef}
                className="msg-list"
            />
            <div className="option-area">
                <ChatInput
                    value={inputValue}
                    onChange={(value) => setInputValue(value)}
                    onClear={() => setInputValue("")}
                    btnDisable={btnDisable}
                    handleSend={handleSend}
                    onPressEnter={handleSend}
                    className="input-area"
                />
            </div>
        </div>
    );
};

export default Chat;