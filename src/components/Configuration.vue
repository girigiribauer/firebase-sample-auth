<template>
  <footer :class="{ 'active': !!user }">
    <div class="footer-inner">
      <h3>ログイン中の情報</h3>
      <ul v-if="!!user">
        <li>uid: {{ user.uid }}</li>
        <li>displayName: {{ user.displayName }}</li>
        <li>photoURL: {{ user.photoURL }}</li>
        <li>email: {{ user.email }}</li>
        <li>emailVerified: {{ user.emailVerified }}</li>
        <li>isAnonymous: {{ user.isAnonymous }}</li>
        <li>phoneNumber: {{ user.phoneNumber }}</li>
        <li v-for="data in user.providerData">providerData:
          <ul>
            <li>providerId: {{ data.providerId }}</li>
          </ul>
        </li>
        <li v-if="user.providerData.length === 0">providerData: none</li>
      </ul>
      <small>{{ user }}</small>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'configuration',
  props: ['user'],
};
</script>

<style>
</style>
