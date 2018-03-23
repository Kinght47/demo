import Vue from 'vue'
import Router from 'vue-router'

// view
// import Root from '@/view/main'
const Root = resolve => require(['@/view/main'], resolve)

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: '/root',
	routes: [
		{
			path: '/',
			redirect: '/main',
		},{
			path: '/main',
			name: 'root',
			component: Root,
		}
	]
})
