import Vue from 'vue'
import VueRouter from 'vue-router'
// eslint-disable-next-line no-unused-vars
import App from '../App.vue'
import Article from '../components/Article'
import PostList from '../components/PostList'
import UserInfo from '../components/UserInfo'
import SlideBar from '../components/SlideBar'
Vue.use(VueRouter)

const routes = [
  {
    name: 'root',
    path: '/',
    components: {
      main: PostList,
    },
  },

  {
    name: 'post_content',
    path: '/topic/:id&author=:name',
    components: {
      main: Article,
      slidebar: SlideBar,
    },
  },
  {
    name: 'user_info',
    path: '/userinfo/:name',
    components: {
      main: UserInfo,
    },
  },
]

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
