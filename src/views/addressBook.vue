<template>
    <div class="addressBook">
        <van-nav-bar title="通讯录" />
        <div class="addressBook-search">
            <van-search v-model="searchData.salesmanName" placeholder='输入搜索内容' @search="onSearch" show-action input-align="center"></van-search>
        </div>
        <div class="list-item" style="position: relative;">
           <div v-for="(item, index) in listData" :key="index" class="section" @click="chat(item)">
                <img :src="item.head_img" alt="">
                <span>{{item.username}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import User from '@/api/User'
const UserM = new User()
export default {
    data () {
        return {
            listData: [],
            searchData: {
                salesmanName: ''
            }
        }
    },
    created () {
        var that = this
        that.addressBook()
    },
    methods: {
        // 调用联系人列表接口
        addressBook () {
            UserM.addressBook({username:this.searchData.salesmanName}).then(res => {
                this.listData = res.data.filter(item => { // 除去自己
                    if(item.headimg === "default1") {
                       item.head_img = require("../assets/img/default1.jpg")
                    }else{
                       item.head_img = require("../assets/img/default2.jpg")
                    }
                    return item.userId != this.$store.state.user.userId
                })
            })
        },
        // 搜索事件
        onSearch () {
          var that = this
          if(this.searchData.salesmanName == "" ){
            return false;
          }
          that.addressBook()
        },
        chat (user) {
          this.$router.push('/chatArea?user='+JSON.stringify(user))
        }
    }
}
</script>

<style lang="less" scoped>
.section{
    margin: 10px;
    padding: 0px 10px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: #f5f5f5;
    height: 50px;
    img{
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin-right: 10px;
    }
}

.addressBook{
    /deep/ .van-search__content {
        border-radius: 17px;
    }
    .list-item{
        position: absolute;
        width: 100%;
        height: calc(100% - 100px);
        overflow: scroll;
    } 
}
</style>