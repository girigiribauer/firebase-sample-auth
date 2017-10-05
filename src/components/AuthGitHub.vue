<template>
  <div class="github markdown-body">
    <h1>GitHub アカウントによる認証</h1>

    <div class="block">
      <h2>ログイン（ポップアップ）</h2>
      <form @submit.prevent="loginWithPopup()">
        <button type="submit">GitHub ログイン</button>
        <p v-if="loginWithPopupErrorText">{{ loginWithPopupErrorText }}</p>
      </form>
    </div>

    <div class="block">
      <h2>ログイン（リダイレクト）</h2>
      <form @submit.prevent="loginWithRedirect()">
        <button type="submit">GitHub ログイン</button>
        <p v-if="loginWithRedirectErrorText">{{ loginWithRedirectErrorText }}</p>
      </form>
    </div>

    <auth-common></auth-common>
  </div>
</template>

<script>
import * as firebase from 'firebase';
import AuthCommon from '@/components/AuthCommon';

export default {
  name: 'authGitHub',
  components: {
    AuthCommon,
  },
  data() {
    return {
      loginWithPopupErrorText: '',
      loginWithRedirectErrorText: '',
    };
  },
  mounted() {
    this.provider = new firebase.auth.GithubAuthProvider();

    // ref: https://developer.github.com/apps/building-integrations/setting-up-and-registering-oauth-apps/about-scopes-for-oauth-apps/
    this.provider.addScope('user');
  },
  methods: {
    loginWithPopup() {
      this.loginWithPopupErrorText = '';
      firebase.auth().signInWithPopup(this.provider)
        .catch((error) => {
          this.loginWithPopupErrorText = `${error.code}: ${error.message}`;

          if (error.credential) {
            this.loginWithPopupErrorText += `<br>${JSON.stringify(error.credential)}`;
          }
        });
    },
    loginWithRedirect() {
      firebase.auth().signInWithRedirect(this.provider)
        .catch((error) => {
          this.loginWithRedirectErrorText = `${error.code}: ${error.message}`;

          if (error.credential) {
            this.loginWithRedirectErrorText += `<br>${JSON.stringify(error.credential)}`;
          }
        });
    },
  },
};
</script>
