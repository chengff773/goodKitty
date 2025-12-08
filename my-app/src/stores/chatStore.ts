/**
 * @file 对话 状态管理
 */

import {create as zustandCreate} from 'zustand';
import {persist, devtools} from 'zustand/middleware';

interface State {
    chatHistory: object;
    chatHistoryList: object[];
}

interface Action {
    setChatHistory: (msg) => void;
    setChatHistoryList: (msg) => void;
};

const useStore = zustandCreate<State & Action>()(
    devtools(
        persist(
            (set, get) => ({
                chatHistory: {},
                setChatHistory: msg => set(state => ({
                    chatHistory: {...state.chatHistory, ...msg}
                })),
                chatHistoryList: [],
                setChatHistoryList: msg => set(state => ({
                    chatHistoryList: [...state.chatHistoryList, msg]
                })),
            }),
            {
                name: 'chat-history'
            }
        ),
        {
            // devtools配置
            name: 'chat-history'
        }
    )
);

export default useStore;