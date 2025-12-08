/**
 * @file 输入框
 */

import { Input, Button } from "antd";
import {
    SendOutlined,
    FileExcelOutlined,
    CloseOutlined
} from '@ant-design/icons';
import useStore from "@/stores";
import fetch from '@/server/fetch';
import Uploader from "./components/uploader";
import "./style.less";

const { TextArea } = Input;

const ChatInput = props => {
    const {
        value,
        btnDisable,
        onChange,
        onClear,
        handleSend,
        onPressEnter
    } = props;

    const {
        inputDisabled,
        uploadInfo,
        clearUploadInfo
    } = useStore();

    const handleClearFile = () => {
        fetch({
            url: 'clear/uploadfile'
        }).then(res => {
            const {success} = res;
            if (+success) {
                clearUploadInfo();
            }
        });
    }

    return (
        <div className="chat-input">
            {uploadInfo && uploadInfo.filename
                ? (
                    <div className="extra-info">
                        <FileExcelOutlined />
                        {uploadInfo.filename}
                        <CloseOutlined
                            className="extra-info-close"
                            onClick={handleClearFile}
                        />
                    </div>
                )
                : null
            }
            <div className="input">
                <TextArea
                    autoSize={{ minRows: 1, maxRows: 5 }}
                    placeholder="input something..."
                    variant="borderless"
                    allowClear
                    value={value}
                    disabled={inputDisabled}
                    onChange={(e) => onChange(e.target.value)}
                    onClear={onClear}
                    onPressEnter={onPressEnter}
                />
                <div className="menu">
                    <Uploader />
                    <Button
                        type="primary"
                        shape="circle"
                        className="button"
                        disabled={btnDisable}
                        onClick={handleSend}
                    >
                        <SendOutlined className="send-icon" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ChatInput;