<template>
  <v-row class="mb-1 mx-15" justify="center" align="center">
    <v-col class="text-right" cols="auto">
      <p>{{type}}：</p>
    </v-col>
    <v-col class="text-left">
      <v-sheet class="pa-5 rounded-lg d-flex" color="#f4f5f6">
        <v-icon v-if="icon == 'good'" color="green">mdi-check-circle</v-icon>
        <v-icon v-if="icon == 'bad'" color="red">mdi-alert-circle</v-icon>
        <v-divider v-if="icon != undefined" vertical class="mx-2"></v-divider>
        <p>{{text}}</p>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    text: String,
    type: String,
    icon: undefined,
  }
}
</script>
