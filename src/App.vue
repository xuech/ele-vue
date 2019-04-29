<template>
  <div id="app">
    <eheader :seller="seller"></eheader>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
  import Eheader from '@/components/header/Eheader.vue'

  export default {
    components: {Eheader},
    data(){
      return {
        seller: {}
      }
    },
    methods:{

    },
    created(){
      this.$http.get('/api/seller').then((res)=>{
        if (res.body.errno === 0) {
          this.seller = res.body.data
        }
      })
    }

  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "./common/stylus/minxin.styl"
  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1;
      text-align: center
      & > a
        font-size: 14px
  .el-active
    color: rgb(240, 20, 20)

</style>
