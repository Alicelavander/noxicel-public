<template>
  <TopHeader />
  <v-main>
    <v-container fluid fill-height>
      <h1>Noxicel</h1>
      <v-row justify="center">
        <input type="file" id="file" @change="getCSV" />
      </v-row>
    </v-container>
  </v-main>
  <TopFooter />
</template>

<script>
import TopHeader from '../template/TopHeader'
import TopFooter from '../template/TopFooter'
import submit from './submit.js';

export default {
  name: 'TopPageView',
  components: {
    TopHeader,
    TopFooter,
  },
  methods: {
    getCSV(e) {
      let file = e.target.files[0];

      //ファイル読み込み
      let reader = new FileReader();
      reader.readAsText(file);

      reader.onload = () => {
        let lines = reader.result.split("\n");
        lines.shift();
        let linesArr = [];
        for (let i = 0; i < lines.length; i++) {
          linesArr[i] = lines[i].split(",");
        }

        submit(linesArr);
      };
    }
  },
}


</script>
