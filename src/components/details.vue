<template>
  <div class="details_section">
    <div class="head">
      <p v-cloak>业务{{$store.state.ruleText.title}}</p>
    </div>
    <div class="text_content" v-html="$store.state.ruleText.content">
    </div>
    <div class="go_back" @click="goBack">确定并返回办理</div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    methods:{
      goBack(){
      this.$router.back();
    }
    },
  beforeRouteLeave(to,from,next){
    if(to.path == '/flowDetail'){
      document.title = '办理页面'
    }
    next();
  }
  }
</script>
<style lang="scss" scoped type="text/css">
@import '../assets/css/details.scss';
</style>
