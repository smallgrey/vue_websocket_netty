import { MSG, CONNECT_WEBSOCKET,SETUSERINFO } from './actionTypes'
import ws from '../net/socket'
import {getLocal} from '../utils/mylocal'

const defaultState = {
   // 用户信息
   user: getLocal('userInfo') || {username:''},
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
      from: '1',
      username: '高磊',
      to: "all",
      data: state.user.username + '上线啦'
    }
    ws.open(u);
    ws.message((msg)=>{
      msg = JSON.parse(msg);
      if (msg.event === MSG) {
        // 消息
        callback(msg);
      }
    }); 
  }

export default (state = defaultState,action) => {
    switch (action.type) {
        case MSG:
            state.msgList.push(action.data)
            const newState = Object.assign(state)
            return newState;
        case CONNECT_WEBSOCKET:
            initConnect(state, action.callback);
            break;
        case SETUSERINFO:
            Object.assign(state.user,action.user)
            break;
        default:
            return state;
    }
}