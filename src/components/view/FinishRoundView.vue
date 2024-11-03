<template>
  <v-sheet position="absolute" location="center">
    <v-row class="mb-16" justify="center">
      <h1>お疲れ様でした！</h1>
    </v-row>
    <v-container class="my-4">
      <v-row justify="center" class="ma-3">
        <span class="font-weight-bold">学んだ単語：</span><span class="">{{ words }}</span>
      </v-row>
    </v-container>
    <v-spacer />
    <v-row class="my-3" justify="center" align="end">
      <v-btn class="ml-3 mr-15 mt-2" size="large" rounded="lg" variant="elevated"
        :to="{ name: 'course detail', params: { course: courseId } }">コースの詳細に戻る</v-btn>
      <v-btn class="ml-3 mr-15 mt-2 text-primary" variant="elevated" size="large" rounded="lg"
        :to="{ path: '/problem' }">次のラウンドへ
      </v-btn>
    </v-row>
  </v-sheet>
</template>

<script>
import { getApp } from '@firebase/app';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';

import { doc, getDoc, updateDoc } from "firebase/firestore";

export default {
  data() {
    return {
      words: '',
      courseId: this.$store.state.courseId,
    }
  },
  async mounted() {
    const db = getFirestore(getApp());
    const problemIndex = this.$store.state.wordsId;
    const courseRef = doc(db, `noxicel/courses/${this.courseId}/${problemIndex}`);

    const docSnap = await getDoc(courseRef);
    const wordList = [];
    if (docSnap.exists()) {
      for (var wordId = 0; wordId < Object.keys(docSnap.data()).length; wordId++) {
        console.log(docSnap.data()[wordId + 1]);
        wordList.push(docSnap.data()[wordId + 1].word);
      }
    } else {
      console.info("問題が見つかりませんでした。")
      // TODO
    }
    this.words = wordList.join(", ");


    const auth = getAuth();
    const user = auth.currentUser;

    const progressRef = doc(db, `noxicel/users/${user.uid}/progress`);
    const progress = await getDoc(progressRef);
    if (progress.exists()) {
      const document = progress.data();
      const done = document[this.courseId]["doneCount"] + 1;
      await updateDoc(progress, {
        [this.courseId]: {
          doneCount: done,
          isDoneAll: false,
          doneCourses: problemIndex
        }
      });
    } else {
      await updateDoc(progress, {
        [this.courseId]: {
          doneCount: 0,
          isDoneAll: false,
          doneCourses: 0
        }
      });
    }
  },
}
</script>

<style scoped>
v-sheet {
  height: 60vh;
}
</style>
