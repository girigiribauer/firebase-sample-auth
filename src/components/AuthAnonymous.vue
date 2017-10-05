<template>
  <div class="anonymous markdown-body">
    <h1>匿名認証</h1>

    <div class="block">
      <h2>ログイン</h2>
      <form @submit.prevent="login()">
        <button type="submit">匿名認証</button>
        <p v-if="loginErrorText">{{ loginErrorText }}</p>
      </form>
    </div>

    <auth-common></auth-common>
  </div>
</template>

<script>
import * as firebase from 'firebase';
import AuthCommon from '@/components/AuthCommon';

export default {
  name: 'authAnonymous',
  components: {
    AuthCommon,
  },
  data() {
    return {
      loginErrorText: '',
    };
  },
  methods: {
    login() {
      firebase.auth().signInAnonymously()
        .catch((error) => {
          this.loginErrorText = `${error.code} - ${error.message}`;
        });
    },
  },
};
</script>
