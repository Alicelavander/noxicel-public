<template>
  <RoundProgress />
  <v-container>
    <v-row class="mx-12">
      <v-col>
        <h2 class="ma-3">"{{ word }}"という単語を使って作文してください。</h2>
        <p class="ma-5">{{ word }}の意味：{{ wordMeaning }}</p>
        <v-form class="ma-6">
          <v-textarea v-model="submitText" class="mx-10" clearIcon="mdi-close-circle" density="comfortable" rows="7"
            clearable variant="outlined">
          </v-textarea>
          <v-row justify="end" noGutters>
            <v-btn class="ml-3 mt-2" size="large" rounded="lg" @click="submit" :to="{ path: '/result' }">提出</v-btn>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RoundProgress from '../part/RoundProgress.vue';

import { getApp } from '@firebase/app';
import { getFirestore } from '@firebase/firestore';

import { doc, getDoc } from "firebase/firestore";

export default {
  data() {
    return {
      word: '読み込み中…',
      wordMeaning: '読み込み中…',
      submitText: ''
    }
  },
  methods: {
    submit: function () {
      this.$store.state.submitText = this.submitText;
    }
  },
  async mounted() {
    const courseId = this.$store.state.courseId;
    const db = getFirestore(getApp());
    const problemIndex = this.$store.state.wordsId;
    const courseRef = doc(db, `noxicel/courses/${courseId}/${problemIndex}`);

    const docSnap = await getDoc(courseRef);
    if (docSnap.exists()) {
      console.log(docSnap.data());
      const wordId = this.$store.state.wordId;
      this.word = docSnap.data()[wordId].word
      this.wordMeaning = docSnap.data()[wordId].meaning
    } else {
      console.info("問題が見つかりませんでした。")
      // TODO
    }
  },
  components: { RoundProgress }
}
</script>
