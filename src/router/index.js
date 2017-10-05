import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import AuthPassword from '@/components/AuthPassword';
import AuthGoogle from '@/components/AuthGoogle';
import AuthFacebook from '@/components/AuthFacebook';
import AuthTwitter from '@/components/AuthTwitter';
import AuthGitHub from '@/components/AuthGitHub';
import AuthPhone from '@/components/AuthPhone';
import AuthAnonymous from '@/components/AuthAnonymous';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/password',
      name: 'Password',
      component: AuthPassword,
    },
    {
      path: '/google',
      name: 'Google',
      component: AuthGoogle,
    },
    {
      path: '/facebook',
      name: 'Facebook',
      component: AuthFacebook,
    },
    {
      path: '/twitter',
      name: 'Twitter',
      component: AuthTwitter,
    },
    {
      path: '/github',
      name: 'GitHub',
      component: AuthGitHub,
    },
    {
      path: '/phone',
      name: 'Phone',
      component: AuthPhone,
    },
    {
      path: '/anonymous',
      name: 'Anonymous',
      component: AuthAnonymous,
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});
