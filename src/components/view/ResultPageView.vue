<template>
  <RoundProgress />
  <v-container fluid>
    <v-row class="ma-3" justify="center">
      <h3>使用した単語: {{ word }}</h3>
    </v-row>
    <v-container>
      <FeedBack :text="submitText" type="あなたの作文" />
      <FeedBack :text="usageText" type="文法チェック" :icon="this.usageEmo" />
      <FeedBack :text="feedbackText" type="用法チェック" :icon="this.feedbackEmo" />
    </v-container>
    <v-row justify="center">
      <p>AIによる修正の評価にご協力ください</p>
    </v-row>
    <v-row justify="center">
      <v-btn v-if="!feedbackSent" icon="mdi-thumb-up" color="green" variant="outlined" @click="sendFeedback('good');" />
      <v-btn v-if="!feedbackSent" icon="mdi-thumb-down" color="red" variant="outlined" @click="sendFeedback('bad');" />
      <p v-if="feedbackSent" class="mt-7 mb-5">{{ feedbackSentText }}</p>
    </v-row>
    <v-row class="mb-3" justify="end">
      <v-btn v-if="this.$store.state.wordId >= setLength" class="ml-3 mr-15 mt-2" size="large" rounded="lg"
        :to="{ path: '/done' }">次へ</v-btn>
      <v-btn v-else class="ml-3 mr-15 mt-2" size="large" rounded="lg" :to="{ path: '/problem' }">次へ</v-btn>
    </v-row>
  </v-container>
</template>

<script>
import FeedBack from "../template/FeedBack.vue"
import RoundProgress from "../part/RoundProgress.vue";
import { getApp } from "@firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getFirestore, doc, getDoc, updateDoc } from '@firebase/firestore';

export default {
  components: {
    FeedBack,
    RoundProgress
  },
  data() {
    return {
      submitText: this.$store.state.submitText,
      feedbackText: 'チェック中…しばらくお待ち下さい…',
      usageText: 'チェック中…しばらくお待ち下さい…',
      usageEmo: undefined,
      feedbackEmo: undefined,
      feedbackSent: false,
      feedbackSentText: '送信中…',
      word: '読み込み中…',
      setLength: undefined,
    }
  },
  mounted: async function () {
    const functions = getFunctions(getApp());
    const submit = httpsCallable(functions, 'submit');
    const feedback = await submit({
      courseId: this.$store.state.courseId,
      wordsId: this.$store.state.wordsId,
      wordId: this.$store.state.wordId,
      submitText: this.$store.state.submitText
    });

    const courseId = this.$store.state.courseId;
    const db = getFirestore(getApp());
    const problemIndex = this.$store.state.wordsId;
    const courseRef = doc(db, `noxicel/courses/${courseId}/${problemIndex}`);
    const docSnap = await getDoc(courseRef);
    const wordId = this.$store.state.wordId;
    this.word = docSnap.data()[wordId].word

    var setLength = 1;
    while (docSnap.data()[setLength] != null) {
      setLength += 1;
    }
    this.setLength = setLength;
    console.log(`set length: ${this.setLength}, current num: ${this.$store.state.wordId}`)

    this.feedbackText = feedback["data"]["feedback"];
    this.usageText = feedback["data"]["usage"];
    (this.feedbackText == '良い文章ですね！') ? this.feedbackEmo = 'good' : this.feedbackEmo = 'bad';
    (this.usageText == this.submitText) ? this.usageEmo = 'good' : this.usageEmo = 'bad';
    this.$store.state.wordId++;
  },
  methods: {
    async sendFeedback(value) {
      const db = getFirestore(getApp());
      const ref = doc(db, `noxicel/feedback`);
      const document = await getDoc(ref);
      const number = document.data()[value];

      this.feedbackSent = true;
      if (value == 'good') {
        await updateDoc(ref, {
          good: number + 1
        });
      } else if (value == 'bad') {
        await updateDoc(ref, {
          bad: number + 1
        });
      }
      this.feedbackSentText = '送信しました。ご協力ありがとうございます！';
    }
  },
}
</script>
