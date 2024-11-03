<template>
  <v-expansion-panel>
    <v-expansion-panel-title>
      <v-icon color="primary" class="mr-3" size="large">mdi-message-question</v-icon>
      {{question}}
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-icon color="secondary" class="mr-3">mdi-message-alert</v-icon>
      {{answer}}
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>

<script>
export default {
  props: {
    question: String,
    answer: String
  }
}
</script>
