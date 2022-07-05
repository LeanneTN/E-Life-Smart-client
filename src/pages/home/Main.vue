<template>
  <div class="columns">
    <div class="column">
      <el-avatar :size="50" :src="circleUrl"></el-avatar>
    </div>
    <div class="column">
      Second column
    </div>
    <div class="column">
      Third column
    </div>
  </div>
</template>

<script>
export default {
  name:'Main',
  data () {
    return {
      circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      sizeList: ["large", "medium", "small"]
    }
  }
}
</script>

<style scoped lang='less'>
  
</style>