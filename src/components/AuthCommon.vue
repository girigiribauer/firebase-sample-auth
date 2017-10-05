<template>
  <div class="common">
    <div class="block">
      <h2>ログアウト</h2>
      <button @click="logout()">ログアウト</button>
      <p v-if="logoutErrorText">{{ logoutErrorText }}</p>
    </div>

    <div class="block">
      <h2>ユーザーを削除する</h2>
      <button @click="deleteUser()">ユーザー削除</button>
      <p v-if="deleteUserErrorText">{{ deleteUserErrorText }}</p>
    </div>

    <div class="block">
      <router-link to="/">Index</router-link>
    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase';

export default {
  name: 'auth-common',
  data() {
    return {
      logoutErrorText: '',
      deleteUserErrorText: '',
    };
  },
  methods: {
    logout() {
      const user = firebase.auth().currentUser;

      if (!user) {
        this.logoutErrorText = 'not login';
        return;
      }

      this.logoutErrorText = '';
      firebase.auth().signOut().then(() => {
        // eslint-disable-next-line
        console.log('sccessful signout');
      }, (error) => {
        this.logoutErrorText = `${error.code} - ${error.message}`;
      });
    },

    deleteUser() {
      const user = firebase.auth().currentUser;

      if (!user) {
        this.deleteUserErrorText = 'not login';
        return;
      }

      this.deleteUserErrorText = '';
      user.delete().then(() => {
        // eslint-disable-next-line
        console.log('user deleted');
      }, (error) => {
        this.deleteUserErrorText = `${error.code} - ${error.message}`;
      });
    },
  },
};
</script>
