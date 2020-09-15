const defaultData = {
  event: 'msg',
  username: '',
  from: '',
  to: "all",
  type: 'text',
  data: ''
}

class WSocket {
  wss;

  constructor() {
    if (!("WebSocket" in window)) {
      alert("您的浏览器不支持 WebSocket!");
    }
  }

  open (c) {
    // 貌似不在短时间内调用onopen 会自动调用，所以在此处new
    try {
      this.wss = new WebSocket("ws://127.0.0.1:8088/ws");
    } catch( err ) {
      alert('连接服务器失败');
    }
    c = Object.assign(defaultData, c);
    let _self = this;
    let timer = ''
    this.wss.onopen = function() {
      this.send(JSON.stringify(c));
      timer = setInterval(function(){
        let c = {
          event: 'heartbeat',
          username: '',
          from: '1015',
          to: "1015",
          type: 'text',
          data: '心跳',
          myHeadUrl: '',
          headUrl: ''
        }
        console.log("心跳")
        _self.sendmsg(c)
      }, 50000);
    };
    this.wss.onclose = function (e) {
      console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
      console.log(e)
      clearInterval(timer)
    }
  }

  message (f) {
    this.wss.onmessage = function(evt) {
      f(evt.data);
    };
  }

  sendmsg (c) {
    c = Object.assign(defaultData, c);
    console.log(JSON.stringify(c))
    this.wss.send(JSON.stringify(c));
  }

}

const socket = new WSocket();

export default socket