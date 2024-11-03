<template>
  <TopHeader />
  <CourseView />
</template>

<script>
import CourseView from '../view/CourseView.vue'
import TopHeader from '../template/TopHeader.vue';
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Eiken 5',
  components: {
    CourseView,
    TopHeader
  }
}
</script>
