<template>
  <p class="itemText">{{  itemText  }}</p>
</template>

<script>
export default {
  name: 'TopPageView',
  props: {
    itemText: String,
  }
}
</script>

<style scoped>
.itemText {
  margin: 0;
  color: black;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  font-size: 30px;
  padding: 0 25px;
}
</style>
