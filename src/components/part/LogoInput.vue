<template>
  <div class="logoIpt">
    <div class="ipt">
      <label><v-icon>{{  logo  }}</v-icon>:</label><input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopPageView',
  props: {
    logo: String
  }
}
</script>

<style>
input {
  height:2em;
  font-size: 1.5em;
}

label {
  width:3em;
  font-size: 1.5em;
}
.logoIpt {
  display: flex;
  justify-content: center;
}
.ipt {
  display: flex;
  padding: 3px;
  border: 2px solid gray;
  align-items: center;
}
</style>
