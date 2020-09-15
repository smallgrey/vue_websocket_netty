<template>  
	<view class="homepage-hero-module">
		<view class="video-container">
		<view :style="fixStyle" class="filter"></view>
		<video :style="fixStyle" autoplay loop class="fillWidth" muted='muted' v-on:canplay="canplay" src="../../static/img/coverr-52-new-zealand-lake-queenstown-mountains-0236.mp4">
		</video>
		<view class="poster hidden" v-if="!vedioCanPlay">
			<img :style="fixStyle" src="没有播放时的图片路径" alt="">
		</view>
		</view>
		<view class="box">
		<view class="form-container">
			<view class="login-title">请登录</view>
			<!-- 用户名密码输入框 -->
			<input  placeholder="用户名/手机号" v-model="user.username"  class="input-item"/>
			<input  placeholder="密码" v-model="user.password"  class="input-item"/>
			<!-- 登录按钮 -->
			<view class="loginbtn" @click="login()">登录</view>
		</view>
		</view>
	</view>
</template>

<script>
	import { setLocal } from '@/utils/mylocal'
	import User from '@/api/User'
	const UserM = new User()
	export default {
		data() {
			return {
				title: 'Hello',
				vedioCanPlay: false,
				fixStyle: '',
				user: {
					username: '', // 用户名
					password: '', // 密码
					code: '' // 验证码
				}
			}
		},
		mounted: function() {
			window.onresize = () => {
				const windowWidth = document.body.clientWidth
				const windowHeight = document.body.clientHeight
				const windowAspectRatio = windowHeight / windowWidth
				let videoWidth
				let videoHeight
				if (windowAspectRatio < 0.5625) {
				videoWidth = windowWidth
				videoHeight = videoWidth * 0.5625
				this.fixStyle = {
					height: windowWidth * 0.5625 + 'px',
					width: windowWidth + 'px',
					'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
					'margin-left': 'initial'
				}
				} else {
				videoHeight = windowHeight
				videoWidth = videoHeight / 0.5625
				this.fixStyle = {
					height: windowHeight + 'px',
					width: windowHeight / 0.5625 + 'px',
					'margin-left': (windowWidth - videoWidth) / 2 + 'px',
					'margin-bottom': 'initial'
				}
				}
			}
			window.onresize()
		},
		methods: {
			canplay() {
				this.vedioCanPlay = true
			},
			// 点击登录按钮 校验成功之后要做的事情
			login () {
				if(this.user.username=="" || this.user.password==""){
				return false;
				}
				UserM.login(this.user).then(res => {
					if (res) {
						// 2.0登录成功保存token与refresh_token 到vuex跟localstorage中
						this.$store.commit('setUserInfo', res.data)
						setLocal('userInfo', res.data)
						this.$store.commit('initConnect', this.msgCallback)
						// 3.0登录成功跳转到首页
						uni.navigateTo({
							url: '/pages/contactMan/addressBook',
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
					}
				})
			},
			msgCallback(msg){
				console.log("服务器发来新消息")
				var that = this;
				// 直接将聊天记录存储
				const ct = {
					sendobj: msg.from,
					content: msg.data,
					myHeadUrl: msg.headUrl,
					window: msg.to == 'all' ? 'all' : msg.from,
					headUrl: msg.myHeadUrl
				};
				that.$store.commit('addChatStorage', ct); 
				// 之后更新新消息提示
				that.$store.commit('newMsg', ct.window);
			}
		}
	}
</script>

<style lang="less" scoped>
  .homepage-hero-module,
  .video-container {
    position: relative;
    height: calc(100vh - 44px);
    overflow: hidden;
  }
 
  .video-container .poster img{
    z-index: 0;
    position: absolute;
  }
 
  .video-container .filter {
    z-index: 1;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    width: 100%;
  }
 
  .fillWidth {
    width: 100%;
  }

  .box{
	  position: absolute;
    top: 0px;
	  z-index: 100;
    width: 100%;
    height: 100%;
  }

  .form-container{
    position: relative;
    width:75%;
    max-width: 300px;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-60%);
  }

  input{
    width: 100%;
    background-color: rgba(255,255,255,0.3);
    border: none;
  }

  .login-title{
    line-height: 46px;
    text-align: center;
    color: #fff;
    margin-bottom: 10px;
  }

  .input-item::-webkit-input-placeholder{
    color: #fff;
  } 

  .input-item{
    height: 46px;
    border-radius: 23px;
    margin: 0 0 20px 0px;
    color: #fff;
    line-height: 46px;
    text-align: center;
  }

  /deep/ .uni-input-placeholder{
	  color: white;
  }

  .loginbtn{
    height: 46px;
    border-radius: 23px;
    color: #000;
    background-color: #fff;
    line-height: 46px;
    text-align: center;
  }
</style>
