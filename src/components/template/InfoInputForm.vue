<template>
  <v-text-field v-model="email" @change="setEmail" variant="filled" type="email" density="compact"
    placeholder="メールアドレス"></v-text-field>
  <v-text-field v-model="password" @change="setPassword" variant="filled" type="password" density="compact"
    placeholder="パスワード">
  </v-text-field>
</template>

<script>

export default {
  inheritAttrs: false,
  name: 'InfoInputForm',
  data() {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    setEmail() {
      this.$emit('set-email', this.email);
    },
    setPassword() {
      this.$emit('set-password', this.password);
    }
  }
}
</script>

<style>

</style>
