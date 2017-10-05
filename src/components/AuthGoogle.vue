<template>
  <div class="google markdown-body">
    <h1>Google アカウントによる認証</h1>

    <div class="block">
      <h2>ログイン（ポップアップ）</h2>
      <form @submit.prevent="loginWithPopup()">
        <button type="submit">Google ログイン</button>
        <p v-if="loginWithPopupErrorText">{{ loginWithPopupErrorText }}</p>
      </form>
    </div>

    <div class="block">
      <h2>ログイン（リダイレクト）</h2>
      <form @submit.prevent="loginWithRedirect()">
        <button type="submit">Google ログイン</button>
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
  name: 'authGoogle',
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
    this.provider = new firebase.auth.GoogleAuthProvider();

    // ref: https://developers.google.com/identity/protocols/googlescopes
    this.provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
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
