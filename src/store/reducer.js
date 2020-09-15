import { MSG, CONNECT_WEBSOCKET, SETUSERINFO, ADDCHATSTORAGE, SETCURRENTCHAT } from './actionTypes'
import ws from '../net/socket'
import {getLocal} from '../utils/mylocal'

let defaultState = {
   // 用户信息
   socket: ws,
   user: getLocal('userInfo')? getLocal('userInfo') : {},
   currentChat: { // 当前窗口信息
     who: '',
     name: ''
   },
   isNeedPush: 0, // 控制了解界面刷新显示消息
}

// 初始化websocket连接 注册
function initConnect (state, callback) {
    const u = {
      event: "reg",
      from: state.user.userId,
      username: state.user.username,
      to: "all",
      data: state.user.username + '上线啦'
    }
    state.socket.open(u);
    state.socket.message((msg)=>{
      msg = JSON.parse(msg);
      if (msg.event === MSG) {
        // 消息
        callback(state,msg);
      }
    }); 
}

/**
     * 服务器msg消息返回处理回调函数
     */
function msgCallback(state,msg) {
  // 直接将聊天记录存储
  console.log("服务器发来消息")
  console.log(msg);
  const ct = {
    sendobj: msg.from,
    content: msg.data,
    myHeadUrl: msg.headUrl,
    window: msg.to === 'all' ? 'all' : msg.from,
    headUrl: msg.myHeadUrl
  };
  
  addChatStorage(state , ct)
  newMsg(state, ct.window)
}

/**
   * 新消息提示
   */
function newMsg (state, cwindow) {
    // 先判断 如果是当前窗口，直接更新 无需加入新消息提示数组
    if (cwindow === state.currentChat.who) {
      state.isNeedPush++;  // 改变即可
    } else {
    //  // 没有则加入提示数组
    //  if (!state.noRead.includes(String(cwindow))) {
    //    state.noRead.push(String(cwindow));
    //  }
    }
}

// 消息推送
function send(state, conf) {
  let _conf = {
    event: "msg",
    from: state.user.userId,
    username: state.user.username,
    to: "all",
    data: ""
  };
  _conf = Object.assign(_conf, conf);
  state.socket.sendmsg(_conf);
}

// 保存聊天记录 sessionStorage.historyChat
function addChatStorage(state, info) {
  let hc = (sessionStorage.historyChat && JSON.parse(sessionStorage.historyChat)) || {};
  const _ct = {
    sendobj: info.sendobj,   // 谁发的
    content: info.content,  // 发送内容
    myHeadUrl: info.myHeadUrl,
    username: info.username, //发送人名称
    headUrl: info.headUrl,
    window: info.window, // 聊天窗口对象
    date: Number(new Date())
  }
  // 聊天记录对应某个聊天窗口对象
  if (!hc[_ct.window]) {
    hc[_ct.window] = [];
  }
  hc[_ct.window].push(_ct);
  sessionStorage.historyChat = JSON.stringify(hc);
}

//设置当前聊天窗口信息
function setChatWindow (state, info) {
  Object.assign(state.currentChat,info)
}

export default (state = defaultState,action) => {
    switch (action.type) {
        case MSG:
             send(state, action.msgContent);
             return state;
        case CONNECT_WEBSOCKET:
            initConnect(state, msgCallback);
            return state;
        case SETUSERINFO:
            Object.assign(state.user,action.user)
            return state;
        case ADDCHATSTORAGE:
            addChatStorage(state, action.data)
            return state;
        case SETCURRENTCHAT:
            setChatWindow(state, action.data);
            return state;   
        default:
            return state;
    }
}