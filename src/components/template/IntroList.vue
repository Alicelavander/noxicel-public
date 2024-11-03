<template>
  <div class="intro-list">
    <v-row>
      <v-col>
        <IntroBlock class="ma-4" intro-title="AIを通したわかりやすい添削。" intro-text="汎用言語モデルの技術を使用して、用法・文脈に応じた添削を行います。"
          intro-source="/assets/demo1.png" />
      </v-col>
      <v-col>
        <IntroBlock class="ma-4" intro-title="作文で文法も同時に。" intro-text="英作文をしながら英単語を学習することで、文法や言い回し等の総合的な英語力も鍛えられます。"
          intro-source="/assets/demo3.png" />
      </v-col>
      <v-col>
        <IntroBlock class="my-4 mx-0" intro-title="目標に応じた問題集。"
          intro-text="英検〇級、TOEIC〇〇〇点など、より目標に近づくための単語を学べます。(各コースを随時追加中です。)" intro-source="/assets/demo2.png" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import IntroBlock from '../part/IntroBlock.vue';

export default {
  components: {
    IntroBlock
  }
}
</script>

<style>

</style>
