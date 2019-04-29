<template>
  <div class="ratings">
    <div class="overview">
      <div class="overview-left">
        <h1 class="score">{{seller.score}}</h1>
        <div class="title">综合评分</div>
        <div class="rank">高于周边商家{{seller.rankRate}}%</div>
      </div>
      <div class="overview-right">
        <div class="score-wrapper">
          <span class="title">服务态度</span>
          <star :size="36" :score="seller.serviceScore"></star>
          <span class="score">{{seller.serviceScore}}</span>
        </div>
        <div class="score-wrapper">
          <span class="title">菜品味道</span>
          <star :size="36" :score="seller.foodScore"></star>
          <span class="score">{{seller.foodScore}}</span>
        </div>
        <div class="delivery-wrapper">
          <span class="title">送达时间</span>
          <span class="delivery">{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
    <split></split>
    <comment-widget :ratings="ratings"></comment-widget>
  </div>
</template>

<script>
  import CommentWidget from '@/components/commentWidget/CommentWidget';
  import split from '@/components/split/split';
  import star from '@/components/star/star';

  export default {
    name: "Ratings",
    components: {
      CommentWidget,
      split,
      star
    },
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: []
      };
    },
    created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body;
        if (response.errno === 0) {
          this.ratings = response.data;
        }
      });
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/minxin"
  .ratings
    font-size: 10px
    color: rgb(147, 153, 159)
    .overview
      display flex
      padding 18px 4px
      .overview-left
        display flex
        flex-direction column
        align-items center
        width 33.3%
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        .score
          font-size 24px
          color rgb(255,153,0)
          line-height 28px
          padding-bottom 6px
        .title
          font-size 12px
          color rgb(7,17,27)
          line-height 12px
          padding-bottom 8px
        .rank
          font-size 10px
          color rgb(147,153,159)
          line-height 10px
          padding-bottom 6px
      .overview-right
        display flex
        flex-direction column
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .score-wrapper
          display flex
          font-size: 0
          margin  0 24px
          .title
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(7, 17, 27)
            margin-bottom 8px
          .star
            margin-left 5px
            margin-bottom 8px
          .score
            display: inline-block
            line-height: 18px
            vertical-align: top
            font-size: 12px
            color: rgb(255, 153, 0)
        .delivery-wrapper
          padding 0 24px
          font-size: 0
          .title
            line-height: 18px
            font-size: 12px
            color: rgb(7, 17, 27)
          .delivery
            margin-left: 12px
            font-size: 12px
            color: rgb(147, 153, 159)







</style>
