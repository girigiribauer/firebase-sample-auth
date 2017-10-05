<template>
  <div class="index markdown-body">
    <h1>各種認証のテスト</h1>
    <ul>
      <li><router-link to="/password">パスワードとEメールによる認証</router-link></li>
      <li><router-link to="/google">Google アカウントによる認証</router-link></li>
      <li><router-link to="/facebook">Facebook アカウントによる認証</router-link></li>
      <li><router-link to="/twitter">Twitter アカウントによる認証</router-link></li>
      <li><router-link to="/github">GitHub アカウントによる認証</router-link></li>
      <li><router-link to="/phone">電話番号（SMS メッセージ）による認証</router-link></li>
      <li><router-link to="/anonymous">匿名認証</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'index',
};
</script>
