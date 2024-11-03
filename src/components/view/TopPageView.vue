<template>
  <TopHeader />
  <v-main>
    <v-parallax src="/assets/top_background.png" height="720">
      <v-container fluid fill-height>
        <v-row justify="center">
          <img class="mx-auto" src="/assets/noxicel_logo.png" width="532.5" height="194" />
        </v-row>
        <IntroList class="intro-list" />
        <v-row class="my-5" justify="center">
          <h3>ただいまオープンβテスト中！</h3>
        </v-row>
        <v-row justify="center">
          <v-btn class="mb-10" size="x-large" rounded="pill" append-icon="mdi-arrow-right" :to="{ path: '/signup' }">
            はじめる</v-btn>
        </v-row>
      </v-container>
    </v-parallax>
  </v-main>
  <TopFooter />
</template>

<script>
import TopHeader from '../template/TopHeader'
import TopFooter from '../template/TopFooter'
import IntroList from '../template/IntroList.vue';

export default {
  name: 'TopPageView',
  components: {
    TopHeader,
    TopFooter,
    IntroList
  },
}
</script>
