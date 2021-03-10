<template>
  <div id="app">
    <Header></Header>
    <div class="main">
      <router-view name="slidebar"> </router-view>
      <router-view name="main"> </router-view>

      <!-- <PostList></PostList> -->
    </div>
  </div>
</template>
<script>
import Header from './components/Header'
import PostList from './components/PostList'
export default {
  name: 'App',
  components: {
    Header,
    // eslint-disable-next-line vue/no-unused-components
    PostList,
  },
}
</script>
<style lang="scss">
#app {
  background-color: #e1e1e1;
}
.main {
  width: 80%;
  margin-left: 80px;
  margin: 0 auto;
}
</style>
