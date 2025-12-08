/**
 * @file 建立sse服务
 */
import {jsonSafeParse} from '../utils/jsonProcess';
import {BASE_URL} from '../constant';

export default class SseService {
  private readonly _sseServer: EventSource;
  public handleTokenChange: (token: string) => void;

  constructor(path: string) {
    const url = path ? `${BASE_URL}${path}` : `${BASE_URL}sse`;
    this._sseServer = new EventSource(url);
    if (this._sseServer) {
      // 监听消息接收
      this._sseServer.onmessage = event => {
        this.handleMessage.call(this, event);
      };

      // 监听连接关闭
      this._sseServer.onerror = (error) => {
        console.error('SSE error:', error);
        this.handleClose.call(this);
      };
    }
  }

  handleMessage(event) {
    const {streamInfo = {}} = jsonSafeParse(event.data) || {};
    if (this.handleTokenChange && typeof this.handleTokenChange === 'function') {
      this.handleTokenChange(streamInfo);
    }
  }

  handleClose() {
    this._sseServer.close();
  }
}