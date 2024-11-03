<template>
  <v-main>
    <v-container fluid>
      <v-row class="mt-1 ml-2" justify="start">
        <v-btn variant="flat" prepend-icon="mdi-chevron-left" :to="{ path: '/mypage/courses' }">戻る</v-btn>
      </v-row>
      <v-row align="center" justify="center">
        <v-col align="center" cols="4">
          <h1 class="mb-3">{{ courseName }}</h1>
          <v-progress-circular class="ma-3" width="35" color="primary" size="250">
            <div class="progress">{{ doneCount * 100 / totalWords }}%</div>
          </v-progress-circular>
          <p class="ma-3">{{ doneCount }} / {{ totalWords }} 単語 学習済み</p>
        </v-col>
        <v-col class="mx-10" cols="6">
          <v-row class="my-1">
            <v-col cols="6">
              <v-btn block size="x-large" height="100" color="secondary" :to="{ path: `/problem` }">学習する(最初から)</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn disabled block size="x-large" height="100" :to="{ path: '/problem' }">復習テスト</v-btn>
            </v-col>
          </v-row>
          <v-row class="my-1">
            <v-col>
              <v-btn disabled block size="x-large" height="70" :to="{ path: '/problem' }">皆の英作文</v-btn>
            </v-col>
          </v-row>
          <v-row class="my-1">
            <v-col>
              <v-btn disabled block size="x-large" height="70" :to="{ path: '/problem' }">単語一覧</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { getApp } from '@firebase/app';
import { getDoc, getFirestore, setDoc, updateDoc } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
import { doc } from "firebase/firestore";

export default {
  name: 'CourseView',
  data() {
    return {
      doneCount: 0,
      courseName: '',
      totalSet: 0,
      totalWords: 0,
      doneCourses: 0,
    }
  },
  async mounted() {
    const auth = getAuth();
    const user = auth.currentUser;
    this.$store.state.courseId = this.$route.params.course;
    const courseId = this.$store.state.courseId;
    const db = getFirestore(getApp());
    const progressRef = doc(db, `noxicel/users/${user.uid}/progress`);
    const progress = await getDoc(progressRef);
    //this.$store.state.wordsId = this.doneCourses + 1;
    this.$store.state.wordId = 1;

    const courseInfoRef = doc(db, `noxicel/courses/${courseId}/0`);
    const course = await getDoc(courseInfoRef);
    this.courseName = course.data()["name"];
    this.totalWords = course.data()["totalWords"];

    if (progress.exists()) {
      const document = progress.data()[courseId];
      if (!document) {
        await updateDoc(progress, {
          [courseId]: {
            doneCount: 0,
            isDoneAll: false,
            doneCourses: 0
          }
        });
      } else {
        this.doneCount = document["doneCount"];
        this.doneCourses = document["doneCourses"]
      }
    } else {
      await setDoc(doc(db, "noxicel", "users", user.uid, "progress"), {
        [courseId]: {
          doneCount: 0,
          isDoneAll: false,
          doneCourses: 0
        }
      });
    }
  }
}

</script>

<style>
.progress {
  font-size: xx-large;
}
</style>
