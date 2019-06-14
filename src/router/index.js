import Vue from 'vue'
import Router from 'vue-router'
import MessageFlow from '@/components/message/MessageFlow'
import MessageDetail from '@/components/message/MessageDetail'
import MessageBrief from '@/components/message/MessageBrief'
import login from '@/components/manage/login.vue'
import index from '@/components/home/index.vue'
import register from '@/components/manage/register.vue'
import main from '@/components/main/Main.vue'
import change from '@/components/manage/change.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/messageFlow',
      name: 'MessageFlow',
      component: MessageFlow
    },
    {
      path: '/messageDetail/:id',
      name: MessageDetail,
      component: MessageDetail
    },
		{
		  path: '/messageBrief/:id',
		  name: MessageBrief,
		  component: MessageBrief
		},
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
			{
			  path: '/register',
			  name: 'register',
			  component: register
			  },
    {
      path: '/main',
      name: 'main',
      component: main
    },
    {
      path: '/change',
      name: 'change',
      component: change
    }
  ]
})
