import React from "react";
import {PageHeader, Input, Button  } from 'antd';
import '../assets/css/chatArea.css';
import store from '../store/index';
import { MSG } from '../store/actionTypes'

class ChatArea extends React.Component{
    constructor (props) {
        super(props)
        this.state = {
            who: {},
            msgContent: '',
            msgList: [].concat(store.getState().msgList)
        }
        // 组件不能自动更新，需要订阅状态
        this.storeChange = this.storeChange.bind(this)  //转变this指向
        store.subscribe(this.storeChange) //订阅Redux的状态，每次state发生改变会触发里面的函数
    }

    componentDidMount() {
      console.log(this.props.location.query)
    }
    storeChange(){
      console.log(store.getState())
    }

    updateMsg (e) {
      this.setState({
        msgContent:e.target.value,
      })
    }

    send () {
      let content = this.state.msgContent;
      content = content.replace(/^\s*/g,"").replace(/\s*$/g, "").substr(0, 200); // max 最大发送200
      if (!content) {
        return;
      }
      const conf = {
        to: this.state.who.userId, // 发送给当前窗口聊天对象
        data: content,
        myHeadUrl: store.getState().user.headimg,
        headUrl: this.who.headimg
      };
      const action = {
        type: MSG ,
        data: conf
      }
      store.dispatch(action)
    }

    render (){
      console.log(this.state.who)
        return (
            <div className="chat-area">
                <PageHeader
                    className="site-page-header"
                    onBack={() => window.history.back()}
                    title={this.state.who.username}
                />
                <div className="chat-content">

                </div>
                <div className="send-area">
                   <Input placeholder="消息内容" onChange={(value) => this.updateMsg(value) }/>
                   <Button type="primary" className="sendButton" onClick={this.send.bind(this)}>发送</Button>
                </div>
            </div>
        )
    }
}

export default ChatArea;