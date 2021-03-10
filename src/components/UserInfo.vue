<template>
  <div class="UserInfo">
    <!-- 数据未返回，加载一个图片 -->
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" />
    </div>
    <div class="userInfomation">
      <section>
        <img :src="userinfo.avatar_url" alt="" />
        <span>{{ userinfo.loginname }}</span>
      </section>
      <div class="topics">
        <p>
          Ta的文章：
        </p>
        <li v-for="(item, index) in userinfo.recent_topics" :key="index">
          <router-link
            :to="{
              name: 'post_content',
              id: item.id,
            }"
          >
            {{ index + 1 }} : {{ item.author.loginname }} {{ item.title }}<br />
          </router-link>
        </li>
      </div>
      <div class="replies">
        <p>
          最近回复：
        </p>
        <li v-for="(item, index) in userinfo.recent_replies" :key="index">
          <router-link
            :to="{
              name: 'post_content',
              id: item.id,
            }"
          >
            {{ index + 1 }} :

            {{ item.author.loginname }}: {{ item.title }}<br />
          </router-link>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: '',
      isLoading: false,
      userinfo: {},
    }
  },
  methods: {
    getData() {
      this.$http
        .get(
          `http://mock.hunger-valley.com/cnode/api/v1/user/${this.$route.params.name}`,
        )
        .then((res) => {
          this.isLoading = false //加载成功，去除动画
          this.userinfo = res.data.data
          console.log(this.userinfo)
        })
        .catch(function(err) {
          //处理返回失败后的问题
          console.log(err)
        })
    },
  },
  beforeMount() {
    this.isLoading = true //加载成功之前显示加载动画
    this.getData() //在页面加载之前获取数据
  },
}
</script>

<style scoped>
* {
  text-decoration: none;
}
.router-link-active {
  color: #666;
}
.router-link-active:hover {
  color: #000;
}
.userInfomation span {
  margin-top: 20px;
}
.userInfomation {
  background: white;
  width: 75%;
  margin: 10px auto;
}
.userInfomation section {
  padding: 12px;
}
.userInfomation img {
  width: 30px;
}
.userInfomation li {
  list-style: none;
}
.userInfomation .replies,
.userInfomation .topics {
  font-size: 0.72rem;
  border-top: 10px #dddddd solid;
}
.userInfomation > div > p {
  padding: 12px 0 12px 12px;
  background-color: rgba(212, 205, 205, 0.17);
  font-size: 0.75rem;
  margin: 0;
}
.userInfomation > div > ul > li {
  padding: 4px 0 4px 12px;
  white-space: nowrap;
  font-size: 0.72rem;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 30px;
  vertical-align: middle;
}
.userInfomation > div > ul > li > a {
  color: #094e99;
  color: red;

  text-decoration: none;
}
li {
  padding: 9px;
  font-size: 15px;
  font-family: 'Helvetica Neue', 'Luxi Sans', 'DejaVu Sans', Tahoma,
    'Hiragino Sans GB', STHeiti, sans-serif !important;
  font-weight: 400;
  background-color: white;
  color: #333;
  border-top: 1px solid #f0f0f0;
}
li:hover {
  background: #f5f5f5;
}

li span {
  line-height: 30px;
}
</style>
