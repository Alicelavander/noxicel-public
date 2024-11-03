<template>
  <v-container>
    <v-row class="mx-auto mt-7 d-flex" align="center" justify="center" no-gutters>
      <v-col class="mx-3" cols="auto">
        <v-icon @click="overlay = !overlay" size="x-large" color="#63767e">mdi-close</v-icon>
      </v-col>
      <v-col class="mx-1" cols="11">
        <v-progress-linear color="primary" :model-value="complete * 100 / setLength" rounded height="20">
        </v-progress-linear>
      </v-col>
    </v-row>
  </v-container>
  <v-overlay v-model="overlay" height="100%" width="100%">
    <v-container class="h-100 card" fluid>
      <v-row>
        <v-col align="center">
          <v-card class="pa-6 mx-auto" width="510">
            <v-card-title>ラウンドを中断しようとしています</v-card-title>
            <v-card-text>
              <div>ラウンドの途中で中断すると<br>それまでの進捗が失われてしまいます！</div>
              <p class="mt-2">本当に中断しますか？</p>
            </v-card-text>
            <v-row justify="center">
              <v-card-actions class="py-0">
                <v-btn class="ma-3" variant="tonal" color="secondary"
                  :to="{ name: 'course detail', params: { course: courseId } }">
                  中断する
                </v-btn>
                <v-btn class="ma-3" variant="tonal" color="primary" @click="overlay = false">
                  ラウンドを続ける
                </v-btn>
              </v-card-actions>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-overlay>
</template>

<script>
import { getApp } from "@firebase/app";
import { getFirestore, doc, getDoc } from '@firebase/firestore';

export default {
  data: () => ({
    overlay: false,
    courseId: '',
    complete: 0,
    setLength: 0,
  }),
  mounted: async function () {
    this.courseId = this.$store.state.courseId;
    this.complete = this.$store.state.wordId;
    const problemIndex = this.$store.state.wordsId;

    const db = getFirestore(getApp());
    const courseRef = doc(db, `noxicel/courses/${this.courseId}/${problemIndex}`);
    const docSnap = await getDoc(courseRef);

    var setLength = 1;
    while (docSnap.data()[setLength] != null) {
      setLength += 1;
    }
    this.setLength = setLength - 1;
  }
}
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
}

p {
  font-size: 1.1em;
}
</style>
