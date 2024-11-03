<template>
  <v-footer padless>
    <v-row justify="center" no-gutters>
      <v-btn variant="plain" class="ma-2" :to="{path: '/'}">Home</v-btn>
      <v-btn variant="plain" class="ma-2" :to="{path: '/faq'}">FAQ</v-btn>
      <v-btn variant="plain" class="ma-2" :to="{path: '/'}">利用規約</v-btn>
      <v-btn variant="plain" class="ma-2" :to="{path: '/'}">お問い合わせ</v-btn>
      <v-col class="my-3 text-center text" cols="12">
        {{ new Date().getFullYear() }} — <strong>Noxicel</strong>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: 'TopPageView',
  data: () => ({
    links: [
      'Home',
      'FAQ',
      '利用規約',
      'お問い合わせ',
    ],
  }),
}
</script>

<style>

</style>
