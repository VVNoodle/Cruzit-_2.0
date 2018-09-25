import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Projects from '@/components/Projects/Index'
import EditProject from '@/components/EditProject'
import CreateProjects from '@/components/CreateProjects/Index'
import ViewProject from '@/components/ViewProject/ViewProject'
import Profile from '@/components/Profile/Index'
import Verification from '@/components//Verification'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: 'projects'
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects
    },
    {
      path: '/projects/create',
      name: 'projects-create',
      component: CreateProjects
    },
    {
      path: '/projects/:projectId',
      name: 'project',
      component: ViewProject
    },
    {
      path: '/projects/:projectId/edit',
      name: 'project-edit',
      component: EditProject
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/verify/:secretToken',
      name: 'verify',
      component: Verification
    }
  ]
})
