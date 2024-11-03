<template>
  <TopHeader />
  <v-main>
    <v-container>
      <v-row>
        <v-col v-if="isLoaded" class="d-flex flex-wrap" cols="9">
          <div v-for="(course, index) in courseList" :key="index">
            <CourseCard :course-id='courseList[index].id' :course-name='courseList[index].name'
              :course-intro="courseList[index].detail" />
          </div>
        </v-col>
        <v-col v-else>
          <h3 class="ma-2">読み込み中…</h3>
        </v-col>
        <v-col cols="3" align="center">
          <v-sheet class="pa-6 mt-6 rounded-lg" color="#f4f5f6">
            <!--現在のicon.jpgは著作権が微妙なのでpublish前にどうにかすること-->
            <v-avatar size="180">
              <v-img class="ma-1" cover lazy-src="/assets/icon.jpg" max-height="200" max-width="200"
                :src="displayImageURL"></v-img>
            </v-avatar>
            <v-row class="my-3" justify="center">
              <span class=".text-h6 font-weight-bold">{{ displayName }}</span>
              <span class=".text-h6"> さん</span>
            </v-row>
            <v-btn :to="{ path: '/mypage/account' }">アカウント編集</v-btn>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import TopHeader from "../template/TopHeader.vue";
import CourseCard from "../part/CourseCard.vue";

import { getApp } from '@firebase/app';
import { doc, getDoc, getFirestore } from '@firebase/firestore';
import { getAuth } from '@firebase/auth';
import { getStorage, getDownloadURL, ref } from '@firebase/storage';

export default {
  components: {
    TopHeader,
    CourseCard
  },
  data: function () {
    return {
      courseList: {},
      isLoaded: false,
      displayName: '',
      displayImageURL: '',
    }
  },
  async mounted() {
    const user = getAuth().currentUser;
    const storageRef = getStorage();
    const imagesRef = ref(storageRef, `${user.uid}/profilePhoto`);
    getDownloadURL(imagesRef)
      .then((url) => {
        this.displayImageURL = url;
      })
      .catch((error) => {
        console.log(error)
      });
    if (user) {
      this.displayName = user.displayName;
      console.log(`photo url: ${this.displayImageURL}`);
    }

    const db = getFirestore(getApp());
    const coursesRef = doc(db, '/noxicel/courses');
    const docsSnap = await getDoc(coursesRef);
    for (let index = 0; index < docsSnap.data()["CourseNames"].length; index++) {
      const courseId = docsSnap.data()["CourseNames"][index];
      const coursePath = '/noxicel/courses/' + courseId + '/0'
      const courseRef = doc(db, coursePath);
      const courseSnap = await getDoc(courseRef);

      const courseInfo = courseSnap.data();
      const courseName = courseInfo["name"];
      const courseDetail = courseInfo["detail"];
      this.courseList[courseName] = {
        id: courseId,
        name: courseName,
        detail: courseDetail
      }
    }
    this.isLoaded = true;
  }
}
</script>
