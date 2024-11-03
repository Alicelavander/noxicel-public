<template>
  <TopHeader />
  <EditProfileView />
  <TopFooter />
</template>

<script>
import EditProfileView from '../view/EditProfileView.vue'
import TopHeader from '../template/TopHeader.vue';
import TopFooter from '../template/TopFooter.vue';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'FAQ',
  components: {
    EditProfileView,
    TopHeader,
    TopFooter
  }
}
</script>
