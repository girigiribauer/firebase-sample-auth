<template>
  <div class="facebook markdown-body">
    <h1>Facebook アカウントによる認証</h1>

    <div class="block">
      <h2>ログイン（ポップアップ）</h2>
      <form @submit.prevent="loginWithPopup()">
        <button type="submit">Facebook ログイン</button>
        <p v-if="loginWithPopupErrorText">{{ loginWithPopupErrorText }}</p>
      </form>
    </div>

    <div class="block">
      <h2>ログイン（リダイレクト）</h2>
      <form @submit.prevent="loginWithRedirect()">
        <button type="submit">Facebook ログイン</button>
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
  name: 'authFacebook',
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
    this.provider = new firebase.auth.FacebookAuthProvider();

    // ref: https://developers.facebook.com/docs/facebook-login/permissions
    this.provider.addScope('user_friends');
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
