import React from "react";
import {PageHeader, Input, Button  } from 'antd';
import '../assets/css/chatArea.css';
import store from '../store/index';
import { MSG, ADDCHATSTORAGE, SETCURRENTCHAT} from '../store/actionTypes'


class ChatArea extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
            who: JSON.parse(this.props.location.query) || {},
            msgContent: '',
            recordContent: []
        }
        // 组件不能自动更新，需要订阅状态
        this.storeChange = this.storeChange.bind(this)  //转变this指向
        store.subscribe(this.storeChange) //订阅Redux的状态，每次state发生改变会触发里面的函数
        
    }

    storeChange (){
      this._resetCurrentChatStorage()
    }

    componentDidMount()
    {
      this._resetCurrentChatStorage()
    }

    componentWillUnmount(){
      //处理逻辑
      store.dispatch({
        type: SETCURRENTCHAT,
        data: {
          who: this.state.who.userId,
          name: this.state.who.username
        }
      })
    }

    updateMsg (e) {
      this.setState({
        msgContent:e.target.value,
      })
    }

    sendmsg () {
      let content = this.state.msgContent;
      content = content.replace(/^\s*/g,"").replace(/\s*$/g, "").substr(0, 200); // max 最大发送200
      if (!content) {
        return;
      }
      const conf = {
        to: this.state.who.userId, // 发送给当前窗口聊天对象
        data: content,
        myHeadUrl: store.getState().user.headimg,
        headUrl: this.state.who.headimg
      };
      const action = {
        type: MSG ,
        msgContent: conf
      }
      store.dispatch(action)
      //聊天记录存入缓存
      let recordData = {
        content,
        sendobj: 'me', //代表自己发的
        myHeadUrl: store.getState().user.headimg,
        username: store.getState().user.username, //发送人名称
        window: this.state.who.userId, // 聊天窗口对象
        headUrl: this.state.who.headimg
      }
      store.dispatch({
        type: ADDCHATSTORAGE,
        data: recordData
      })
      // 重新初始化 再清空输入框
      this._resetCurrentChatStorage();
      this.setState({
        msgContent:''
      })
    }

    /**
     * 重新初始化聊天界面 获取聊天记录
     */
    _resetCurrentChatStorage () {
      const hc = (sessionStorage.historyChat && JSON.parse(sessionStorage.historyChat)) || {};
      let recordContent = hc[this.state.who.userId] ? hc[this.state.who.userId] : [];
      for(let i=0;i<recordContent.length;i++){
        if(recordContent[i].myHeadUrl === "default1"){
          recordContent[i].myHead_url = require("../assets/img/default1.jpg")
        }else{
          recordContent[i].myHead_url = require("../assets/img/default2.jpg")
        }

        if(recordContent[i].headUrl === "default1"){
          recordContent[i].head_url = require("../assets/img/default1.jpg")
        }else{
          recordContent[i].head_url = require("../assets/img/default2.jpg")
        }
      }
      this.setState({
        recordContent
      })
      // // 同时将滚动条放置聊天底部 这里要延时才行，原因不明
      // setTimeout(()=> {
      //   this.$refs.chatbox.scrollTop = this.$refs.chatbox.scrollHeight;
      // }, 10);
    }

    render (){
        return (
            <div className="chat-area">
                <PageHeader
                    className="site-page-header"
                    onBack={() => window.history.back()}
                    title={this.state.who.username}
                />
                <div className="chat-content">
                  {
                     this.state.recordContent.map( (item,index) => {
                          let userMessage;
                          if (item.sendobj !== 'me') {
                            userMessage = (
                              <div className="word" key = {index}>
                                  <img src={item.head_url} alt=""/>
                                  <div className="info">
                                      <div className="info-content">{item.content}</div>
                                  </div>
                              </div>
                            )
                         }else{
                            userMessage = (
                              <div className="word-my" key = {index}>
                                <div className="info">
                                    <div className="info-content">{item.content}</div>
                                </div>
                                <img src={item.myHead_url} alt=""/>
                              </div>
                            )
                         }
                         return userMessage
                     })
                  }
                </div>
                <div className="send-area">
                   <Input placeholder="消息内容" onChange={(value) => this.updateMsg(value) }/>
                   <Button type="primary" className="sendButton" onClick={ ()=> this.sendmsg() }>发送</Button>
                </div>
            </div>
        )
    }
}

export default ChatArea;