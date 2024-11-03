<template>
  <TopHeader />
  <FAQView />
  <TopFooter />
</template>

<script>
import FAQView from '../view/FAQView.vue'
import TopHeader from '../template/TopHeader.vue';
import TopFooter from '../template/TopFooter.vue';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'FAQ',
  components: {
    FAQView,
    TopHeader,
    TopFooter
  }
}
</script>
