<template>
  <v-card class="ma-6" elevation="2" width="350">
    <v-card-title>{{ courseName }}</v-card-title>
    <v-card-text>{{ courseIntro }}</v-card-text>
    <v-row justify="center" align="center" class="mx-0">
      <v-col class="ml-1" cols="2">
        <label> {{ completedRate }}% </label>
      </v-col>
      <v-col class="mx-1" cols="9">
        <v-progress-linear v-model="completedRate" rounded height="6"></v-progress-linear>
      </v-col>
    </v-row>
    <v-card-actions>
      <v-row justify="end">
        <v-btn class="mx-3" variant="text" :to="{ name: 'course detail', params: { course: courseId } }">学習する
        </v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import { getApp } from '@firebase/app';
import { getDoc, getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc } from "firebase/firestore";

export default {
  props: {
    courseId: String,
    courseName: String,
    courseIntro: String,
  },
  data() {
    return {
      completedRate: 0,
    }
  },
  async mounted() {
    console.log(this.courseId);
    const auth = getAuth();
    const user = auth.currentUser;
    const db = getFirestore(getApp());
    const progressRef = doc(db, `noxicel/users/${user.uid}/progress`);
    const docSnap = await getDoc(progressRef);
    if (docSnap.exists()) {
      const progress = docSnap.data()[this.courseId];
      if (!progress) {
        await updateDoc(progressRef, {
          [this.courseId]: {
            doneCount: 0,
            isDoneAll: false,
            doneCourses: 0
          }
        });
      } else {
        const courseInfoRef = doc(db, `noxicel/courses/${this.courseId}/0`)
        const course = await getDoc(courseInfoRef);
        this.completedRate = docSnap.data()[this.courseId]["doneCount"] * 100 / course.data()["totalWords"];
      }
    }
  }
}
</script>
