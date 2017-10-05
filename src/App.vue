<template>
  <div id="app">
    <router-view></router-view>

    <configuration :user="user"></configuration>
  </div>
</template>

<script>
import * as firebase from 'firebase';
import Configuration from '@/components/Configuration';

export default {
  name: 'app',
  components: {
    Configuration,
  },
  data() {
    return {
      user: '',
    };
  },
  created() {
    const config = {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
    };

    if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
    }

    firebase.auth().onAuthStateChanged((_user) => {
      this.user = _user;
    });
  },
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  text-align: left;
}
#app {
  width: 100%;
  height: 100%;
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
}
.markdown-body {
  padding: 10px;
}
.block + .block {
  padding-top: 50px;
}
label {
  display: block;
}
footer {
  width: 30%;
  height: 100%;
  box-sizing: border-box;
  position: fixed;
  right: 0;
  top: 0;
  margin-right: -30%;
  background: #eee;
  overflow: scroll;
  word-wrap: break-word;
  transition: margin 300ms ease-out;
}
footer.active {
  margin-right: 0;
}
.footer-inner {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
</style>
