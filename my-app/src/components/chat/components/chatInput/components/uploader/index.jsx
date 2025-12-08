/**
 * @file 文件上传
 */

import {useRef, useEffect} from 'react';
import { Button } from "antd";
import {PaperClipOutlined} from '@ant-design/icons';
import uploadServer from '@/server/uploadServer';
import useStore from "@/stores";
import './style.less';

const Uploader = () => {

    const fileInputRef = useRef(null);
    const {
        sendTrigger,
        uploadInfo,
        setUploadInfo,
        clearUploadInfo,
        inputDisabled
    } = useStore();

    const handleUpload = () => {
        const fileInputNode = fileInputRef.current;
        fileInputNode.click();
    };

    useEffect(() => {
        const fileInputNode = fileInputRef.current;
        if (fileInputNode) {
            const handleFileChange = (event) => {
                const file = event.target.files[0];
                uploadServer({
                    file
                }).then(data => {
                   setUploadInfo(data);
                });
            };
            fileInputNode.addEventListener('change', handleFileChange);

            return () => {
                fileInputNode.removeEventListener('change', handleFileChange);
            }
        }
    }, []);

    useEffect(() => {
        // 每次发送请求时，清除上传信息
        clearUploadInfo();
    }, [sendTrigger]);

    useEffect(() => {
        // uploadInfo为空时，清除input的value
        if (!uploadInfo && fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, [uploadInfo]);

    return (
        <div className='uploader'>
            <input
                type="file"
                ref={fileInputRef}
                style={{display: 'none'}}
            >
            </input>
            <Button
                type="primary"
                shape="circle"
                className="button"
                onClick={handleUpload}
                disabled={inputDisabled || (uploadInfo && uploadInfo.filename)}
            >
                <PaperClipOutlined />
            </Button>
        </div>
    );
};

export default Uploader;