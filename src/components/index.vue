<template>
<div class="wrapper">
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
  <foot-nav></foot-nav>
</div>
</template>
<script type="text/ecmascript-6">
  import footNav from '@/components/footNav'
export default {
  components:{
    footNav
  }
}
</script>
<style lang="scss" scoped="" type="text/css">
  @import '../assets/css/index.scss';
</style>
