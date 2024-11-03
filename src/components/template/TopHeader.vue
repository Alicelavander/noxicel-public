<template>
  <div>
    <v-app-bar fixed>
      <v-row>
        <v-col class="ma-1" align-self="start" cols="4">
          <v-img src="/assets/noxicel_logo.png" height="62" @click="goHome" />
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <div v-if="!userName">
        <v-btn variant="text" class="mx-1 px-1" :to="{ path: '/signup' }">アカウント登録</v-btn>
        <v-btn variant="outlined" class="mx-3" color="primary" :to="{ path: '/login' }">ログイン</v-btn>
      </div>
      <div v-else>
        <v-btn variant="plain" class="mx-1 px-1" :to="{ path: '/mypage' }">{{ userName }}</v-btn>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import { getAuth } from '@firebase/auth';


export default {
  name: 'TopPageView',
  computed: {
    userName: function () {
      const user = getAuth().currentUser;
      if (!user) return null;
      else return (user.displayName ? user.displayName : "user")
    }
  },
  methods: {
    goHome() {
      this.$router.push('/');
    }
  },
}
</script>

<style>

</style>
