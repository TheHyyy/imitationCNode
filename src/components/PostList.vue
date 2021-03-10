<template>
  <div class="PostList">
    <!-- 在数据未返回的额时候，显示这个正在加载的gif -->
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" />
    </div>
    <!-- 
      http://mock.hunger-valley.com/cnode/api/xxx 
      https://cnodejs.org/api/v1 
      http://mock.hunger-valley.com/cnode/api/v1/topics
      -->
    <!-- 代表我们的主题帖子列表 -->
    <div v-else>
      <ul>
        <li>
          <div class="toobar">
            <span>全部</span>
          </div>
        </li>
        <li v-for="(post, index) in posts" :key="index">
          <!-- 头像 -->
          <img :src="post.author.avatar_url" />
          <span>
            <!-- 回复量 -->
            <span class="reply_count">{{ post.reply_count }}</span>
            <!-- 浏览量 -->
            / {{ post.visit_count }}
          </span>
          <!-- 帖子分类 -->
          <span
            :class="[
              {
                put_good: post.good === true,
                put_top: post.top === true,
                'topiclist-tab': post.good !== true && post.top !== true,
              },
            ]"
          >
            <span> {{ post | tabFormatter }} </span>
          </span>
          <!-- 文章标题 -->
          <router-link
            :to="{
              name: 'post_content',
              params: {
                id: post.id,
                name: post.author.loginname,
              },
            }"
          >
            <span>
              {{ post.title }}
            </span>
          </router-link>

          <!-- 最终回复时间 -->
          <span class="last_reply">
            {{ post.last_reply_at | formatDate }}
          </span>
        </li>
        <li>
          <!-- 分页 -->
          <Pagination @handleList="renderList"></Pagination>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Pagination from './Pagination'
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      msg: '',
      isLoading: false,
      posts: [],
      postPage: 1,
    }
  },
  beforeMount() {
    this.isLoading = false
    this.getData()
  },
  methods: {
    getData() {
      this.$http
        .get('http://mock.hunger-valley.com/cnode/api/v1/topics', {
          params: {
            page: this.postPage,
            limit: 20,
          },
        })
        .then((res) => {
          console.log('成功信息')
          console.log(res)
          this.posts = res.data.data
        })
        .catch((err) => {
          // 处理返回失败的问题
          console.log('错误信息：')
          console.log(err)
        })
    },
    renderList(value) {
      this.postPage = value
      this.getData()
    },
  },
}
</script>

<style scoped>
.PostList {
  background-color: #e1e1e1;
}
.posts {
  margin-top: 10px;
}

.PostList img {
  height: 30px;
  width: 30px;
  vertical-align: middle;
}

ul {
  list-style: none;
  width: 100%;
  max-width: 1344px;
  margin: 0 auto;
}

ul li:not(:first-child) {
  padding: 9px;
  font-size: 15px;
  font-family: 'Helvetica Neue', 'Luxi Sans', 'DejaVu Sans', Tahoma,
    'Hiragino Sans GB', STHeiti, sans-serif !important;
  font-weight: 400;
  background-color: white;
  color: #333;
  border-top: 1px solid #f0f0f0;
}

li:not(:first-child):hover {
  background: #f5f5f5;
}

li:last-child:hover {
  background: white;
}

li span {
  line-height: 30px;
}

.allcount {
  width: 70px;
  display: inline-block;
  text-align: center;
  font-size: 12px;
}

.reply_count {
  color: #9e78c0;
  font-size: 14px;
}

.put_good,
.put_top {
  background: #80bd01;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  color: #fff;
  font-size: 12px;
  margin-right: 10px;
}

.topiclist-tab {
  background-color: #e5e5e5;
  color: #999;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  font-size: 12px;
  margin-right: 10px;
}

.last_reply {
  text-align: right;
  min-width: 50px;
  display: inline-block;
  white-space: nowrap;
  float: right;
  color: #778087;
  font-size: 12px;
}

.toobar {
  height: 40px;
  background-color: #f5f5f5;
}

.toobar span {
  font-size: 14px;
  color: #80bd01;
  line-height: 40px;
  margin: 0 10px;
  cursor: pointer;
}

.toobar span:hover {
  color: #9e78c0;
}

a {
  text-decoration: none;
  color: black;
}

a:hover {
  text-decoration: underline;
}

.loading {
  text-align: center;
  padding-top: 300px;
}
ul {
  padding-left: 0;
}
</style>
