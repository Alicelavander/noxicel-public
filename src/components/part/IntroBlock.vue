<template>
  <v-card rounded color="#f7f7ff">
    <v-card-title>{{ introTitle }}</v-card-title>
    <v-card-text class="my-1">{{ introText }}</v-card-text>
    <v-img class="mb-2 mx-2" height="220" cover :src="introSource" />
  </v-card>
</template>

<script>
export default {
  name: 'TopPageView',
  props: {
    introTitle: String,
    introText: String,
    introSource: String,
  }
}
</script>
