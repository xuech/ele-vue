<template>
  <div class="ratingselect">
    <div class="ratingType border-1px">
      <span @click="select(2)" class="block positive" :class="{'active': buttonType === 2}">{{commentButtonTitle.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0)" class="block positive" :class="{'active': buttonType === 0}">{{commentButtonTitle.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1)" class="block negative" :class="{'active': buttonType === 1}">{{commentButtonTitle.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleClick()" class="switch" :class="{'on': canShowAllContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
    <div class="rating-wrapper">
      <ul v-show="ratings && ratings.length">
        <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings" class="rating-item border-1px">
          <div class="user">
            <span class="name">{{rating.username}}</span>
            <img class="avatar" :src="rating.avatar" width="12" height="12"/>
          </div>
          <div class="time">{{rating.rateTime | formatDate()}}</div>
          <p class="content">
            <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
          </p>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  import {formatDate} from '@/common/js/date';

  export default {
    name: "CommentWidget",
    data() {
      return{
        buttonType: this.defButtonType,
        canShowAllContent: this.showAllContent
      }
    },
    props: {
      ratings: {
        type: Array,
        default() {
          return []
        }
      },
      defButtonType:{
        type: Number,
        default: 2
      },
      //是否看到全部内容
      showAllContent: {
        type: Boolean,
        default: true
      },
      //评论按钮的title
      commentButtonTitle: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }

    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    methods:{
      select(type){
        this.buttonType = type
        this.$emit('refresh')
      },
      toggleClick(){
        this.canShowAllContent = !this.canShowAllContent
        this.$emit('refresh')
      },
      needShow(type,text){
         if (this.canShowAllContent && !text){
           return false
         }
         if (this.buttonType === 2){
           return true
         } else {
           return type === this.buttonType
         }
      }
    },
    computed: {
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === 0;
        });
      },
      negatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === 1;
        });
      }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/minxin"

  .ratingType
    padding 18px 0
    margin 0 18px
    border-1px(rgba(7,17,27,0.1))
    font-size 0
    .block
      display inline-block
      padding 8px 12px
      margin-right 8px
      border-radius 1px
      color: rgb(77,85,93)
      font-size 12px
      line-height 16px
      &.active
        color #fff
      .count
        padding-left 2px
        font-size 8px
      &.positive
        background rgba(0,160,220,0.2)
        &.active
          background rgb(0,160,220)
      &.negative
        background rgba(78,85,93,0.2)
        &.active
          background rgb(78,85,93)
  .switch
    padding: 12px 18px
    line-height: 24px
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    color: rgb(147, 153, 159)
    font-size: 0
    &.on
      .icon-check_circle
        color: #00c850
    .icon-check_circle
      display: inline-block
      vertical-align: top
      margin-right: 4px
      font-size: 24px
    .text
      display: inline-block
      vertical-align: top
      font-size: 12px
  .rating-wrapper
    padding 0 18px
    .rating-item
      position: relative
      padding: 16px 0
      border-1px(rgba(7, 17, 27, 0.1))
      .user
        position: absolute
        right: 0
        top: 16px
        line-height: 12px
        font-size: 0
        .name
          display: inline-block
          margin-right: 6px
          vertical-align: top
          font-size: 10px
          color: rgb(147, 153, 159)
        .avatar
          border-radius: 50%
      .time
        margin-bottom: 6px
        line-height: 12px
        font-size: 10px
        color: rgb(147, 153, 159)
      .content
        line-height: 16px
        font-size: 12px
        color: rgb(7, 17, 27)
        .icon-thumb_up, .icon-thumb_down
          margin-right: 4px
          line-height: 16px
          font-size: 12px
        .icon-thumb_up
          color: rgb(0, 160, 220)
        .icon-thumb_down
          color: rgb(147, 153, 159)







</style>
