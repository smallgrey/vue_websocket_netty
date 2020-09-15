<template>
    <view class="tabBar-Bottom">
       <view :style="'height:'+TBarHeight+'px'" class="tab">底部tab</view>
    </view>
</template>


<script>
export default {
    data () {
        return {
            TBarHeight: 50
        }
    }
}
</script>>

<style lang="stylus" scoped>
.tabBar-Bottom
    position fixed
    width 100%
    bottom 0
    background #F7F7F7
   .tab{
       display flex
       align-items center
       justify-content center
   } 
</style>