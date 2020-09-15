export  default {
    state: {
        hasLogin: false, // 登陆状态
        loginProvider: "", // 登陆方式 如微信
        userInfo: {},

    },
    getters: {
        userInfo (state) {
            return state.userInfo
        },
        login (state) {
            return state.hasLogin
        }
    },
    mutation: {
        login (state,provider){
            state.hasLogin = true;
            state.loginProvider = provider
        },
        loginOut (state) {
            state.hasLogin = false;
            state.userInfo = ""
        },
        setUserinfo (state, userInfo) {
            state.userInfo = userInfo
        }
    },
    action: {
        isLogin: async function (){
            return await new Promise ((resolve,reject) => {
                if(false){
                    resolve(false);
                }else{
                    reject(true);
                }
            })
        }
    }
}