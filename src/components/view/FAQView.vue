<template>
  <v-main>
    <v-container fluid>
      <v-row class="mt-6 mb-10" justify="center">
        <h1>よくある質問（FAQ）</h1>
      </v-row>
      <v-row class="my-10" justify="center">
        <v-col cols="9">
          <v-expansion-panels class="ma-1">
            <FAQ question="質問・意見があるのですがどうすれば良いですか？"
              answer="TwitterのDM(@noxicel)またはalicelavander@gmail.comまでお気軽にご連絡ください。" />
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import FAQ from "../part/FAQ.vue"

export default {
  components: { FAQ }
}
</script>
