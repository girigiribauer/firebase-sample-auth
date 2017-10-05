<template>
  <div class="password markdown-body">
    <h1>パスワードとEメールによる認証</h1>

    <div class="block">
      <h2>新規ユーザー作成</h2>
      <form @submit.prevent="signIn(emailSignIn, passwordSignIn)">
        <label for="email-signin">
          email: <input type="text" id="email-signin" v-model="signInEmail">
        </label>
        <label for="password-signin">
          password: <input type="password" id="password-signin" v-model="signInPassword">
        </label>
        <button type="submit">パスワード認証</button>
        <p v-if="signInErrorText">{{ signInErrorText }}</p>
      </form>
    </div>

    <div class="block">
      <h2>ユーザー作成後の確認メール送信</h2>
      <form @submit.prevent="sendEmailVerification()">
        <p><small>Emailで確認を取らないという選択肢も取れる</small></p>
        <button type="submit">メール送信</button>
        <p v-if="sendEmailMessageText">{{ sendEmailMessageText }}</p>
        <p v-if="sendEmailErrorText">{{ sendEmailErrorText }}</p>
      </form>
    </div>

    <div class="block">
      <h2>ログイン</h2>
      <form @submit.prevent="login(emailLogin, passwordLogin)">
        <label for="email-login">
          email: <input type="text" id="email-login" v-model="loginEmail">
        </label>
        <label for="password-login">
          password: <input type="password" id="password-login" v-model="loginPassword">
        </label>
        <button type="submit">パスワード認証</button>
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
  name: 'authPassword',
  components: {
    AuthCommon,
  },
  data() {
    return {
      signInEmail: '',
      signInPassword: '',
      signInErrorText: '',

      sendEmailMessageText: '',
      sendEmailErrorText: '',

      loginEmail: '',
      loginPassword: '',
      loginErrorText: '',
    };
  },
  methods: {
    signIn(email, password) {
      this.signInErrorText = '';
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch((error) => {
          this.signInEmail = '';
          this.signInPassword = '';
          this.signInErrorText = `${error.code} - ${error.message}`;
        });
    },
    sendEmailVerification() {
      const user = firebase.auth().currentUser;

      this.sendEmailErrorText = '';
      user.sendEmailVerification().then(() => {
        this.sendEmailMessageText = 'sent email';
      }, (error) => {
        this.sendEmailErrorText = `${error.code} - ${error.message}`;
      });
    },
    login(email, password) {
      this.loginErrorText = '';
      firebase.auth().signInWithEmailAndPassword(email, password)
        .catch((error) => {
          this.loginEmail = '';
          this.loginPassword = '';
          this.loginErrorText = `${error.code} - ${error.message}`;
        });
    },
  },
};
</script>
