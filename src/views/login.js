import React from "react";
import '../assets/css/login.css';
import store from '../store/index';
import { CONNECT_WEBSOCKET, SETUSERINFO } from '../store/actionTypes'
import {setLocal}  from '../utils/mylocal'

class Login extends React.Component {
    // // // 创建自定义函数来写入方法 监听窗口的变化
    // handleResize = e => {
	// 	// 根据宽度不同，进行你所要进行的操作
    //     this.calcFixStyle()
    // }
    // componentDidMount(){
    //     //监听窗口大小改变
    //     window.addEventListener('resize', this.handleResize.bind(this));
    // }
    // //移除监听器，防止多个组件之间导致this的指向紊乱
    // componentWillUnmount() {
    //     window.removeEventListener('resize', this.handleResize.bind(this));
    // }

    constructor () {
        super()
        this.fixStyle = {}
        this.state = {
          username: '',
          password: ''
        }
    }

    calcFixStyle (){  //计算该大小窗口下的视频样式
        var windowWidth = window.innerWidth
        var windowHeight = window.innerHeight
        var windowAspectRatio = windowHeight / windowWidth
        var videoWidth
        var videoHeight
        var fixStyle
        if (windowAspectRatio < 0.5625) {
          videoWidth = windowWidth
          videoHeight = videoWidth * 0.5625
          fixStyle = {
            height: windowWidth * 0.5625 + 'px',
            width: windowWidth + 'px',
            marginLeft: (windowHeight - videoHeight) / 2 + 'px',
            marginBottom: 'initial'
          }
        } else {
          videoHeight = windowHeight
          videoWidth = videoHeight / 0.5625
          fixStyle = {
            height: windowHeight + 'px',
            width: windowHeight / 0.5625 + 'px',
            marginLeft: (windowWidth - videoWidth) / 2 + 'px',
            marginBottom: 'initial'
          }
        }
        this.fixStyle = fixStyle;
    }

    updateUserInfo(type,e){
      if(type === 'username') {
        this.setState({
          username: e.target.value
        })
      }
      if(type === 'pwd') {
        this.setState({
          password: e.target.value
        })
      }
    }

    login () {
      if(this.state.username === '' || this.state.password === '') return;
      fetch("http://localhost:8090/user/login?username="+this.state.username+'&password='+this.state.password)
        .then(res => res.json())
        .then(result => {
            // 2.0登录成功保存token与refresh_token 到redux跟localstorage中
            var  setUser = {
              type: SETUSERINFO,
              user: result.data
            }
            store.dispatch(setUser)
            setLocal('userInfo', result.data)

            //连接websocket  
            const action = {
              type: CONNECT_WEBSOCKET,
              callback: this.msgCallback.bind(this)
            }
            store.dispatch(action)
            let history = this.props.history;
            history.push("/addressBook")
        })
    }

    /**
     * 服务器msg消息返回处理回调函数
     */
    msgCallback(msg) {
        console.log(msg)
    }
    render () {
        this.calcFixStyle()
        return (
            <div className="homepage-hero-module">
                <div className="video-container">
                    <div className="filter" style={this.fixStyle}></div>
                    <video autoPlay loop  style={this.fixStyle} className="fillWidth" muted='muted'>
                        <source src={require('../assets/img/coverr-52-new-zealand-lake-queenstown-mountains-0236.mp4')} type="video/mp4"/>
                        浏览器不支持 video 标签，建议升级浏览器。
                    </video>
                    <div className="box">
                        <div className="form-container">
                            <div className="login-title">请登录</div>
                            <input  placeholder="用户名/手机号" onChange={(e)=>this.updateUserInfo('username',e)}  className="input-item"/>
                            <input  placeholder="密码" onChange={(e)=>this.updateUserInfo('pwd',e)}  className="input-item"/>
                            <div className="loginbtn" onClick={()=>this.login()} >登录</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login