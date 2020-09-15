
import config from "../config/index"
const websockethost = config.websockethost



class WSocket {
  wss;
  defaultData = {
    event: 'msg',
    username: '',
    from: '',
    to: "all",
    type: 'text',
    data: ''
  }

  constructor() {
  }

  open (c) {
    this.wss = uni.connectSocket({
      url: 'ws://' + websockethost + '/ws',
      success() {
        console.log("websocket连接成功");
      },
    })

    c = Object.assign(this.defaultData, c);
    let _self = this;
    let timer = ""
    this.wss.onOpen(function(res) {
      _self.send(c);
      timer = setInterval(function(){
        let c = {
          event: 'heartbeat',
          username: '',
          from: '1015',
          to: "1015",
          type: 'text',
          data: '心跳'
        }
        console.log("心跳")
        _self.send(c)
      }, 50000);
    })

    this.wss.onClose(function(res) {
        console.log('WebSocket 已关闭！');
        clearInterval(timer)
		});
  }

  message (f) {
    this.wss.onMessage(function(res) {
      f(res.data);
    });
  }
  
  send (c) {
    c = Object.assign(this.defaultData, c);
    this.wss.send({
      data: JSON.stringify(c),
      async success() {
      },
    });
  }

}

export default new WSocket();