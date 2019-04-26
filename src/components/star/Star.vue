<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item" track-by="$index"></span>
  </div>
</template>

<script>
  export default {
    name: "Star",
    props:{
      size:{
        type:Number
      },
      score:{
        type:Number
      }
    },
    computed:{
      starType(){
        return 'star-' + this.size
      },
      //根据score取整，4.2 => 4 / 4.6=>4.5
      itemClasses(){
        let res = []
        let score = Math.floor(this.score * 2)/2;
        //是否有半星
        let hasDecimal = score % 1 !== 0
        let integer = Math.floor(score)
        for (let i = 0; i < integer; i++){
          res.push("on")
        }
        if (hasDecimal){
          res.push("half")
        }
        while (res.length < 5){
          res.push("off")
        }
        return res

      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/minxin.styl"
.star
  font-size 0
  .star-item
    display inline-block
    background-repeat no-repeat
  &.star-48
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px
      &.on
        bg-image('star48_on')
      &.half
        bg-image('star48_half')
      &.off
        bg-image('star48_off')
  &.star-36
    .star-item
      width 15px
      height 15px
      margin-right 22px
      background-size 15px 15px
      &.on
        bg-image('star36_on')
      &.half
        bg-image('star36_half')
      &.off
        bg-image('star36_off')
  &.star-24
    .star-item
      width 20px
      height 20px
      margin-right 22px
      background-size 20px 20px
      &.on
        bg-image('star24_on')
      &.half
        bg-image('star24_half')
      &.off
        bg-image('star24_off')
</style>
