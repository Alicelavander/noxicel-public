<template>
  <v-main>
    <v-container class="fluid fill-height">
      <v-row justify="center">
        <v-col align="center">
          <v-card class="elevation-12 mx-auto align-center" width="500">
            <img class="mx-auto mt-3" src="/assets/noxicel_logo.png" height="77.6" width="213" />
            <v-card-title class="pa-0">ログイン</v-card-title>
            <div class="error ma-3">{{ error }}</div>
            <v-form class="mx-9" ref="form">
              <v-container>
                <InfoInputForm @set-email="setEmail" @set-password="setPassword" class="form" />
                <v-btn class="primary mt-0" @click="login">ログイン</v-btn>
              </v-container>
            </v-form>
            <v-divider></v-divider>
            <v-btn class="fill-width text-capitalize caption my-4" rounded height="48px" outlined
              style="border-color: #979797" @click="googleSignIn">
              <img class="button-logo-img mr-4" src="/assets/google_logo.png" style="height: 24px" />
              Googleで続ける
            </v-btn>
            <br>
            <div class="my-3">
              <router-link to="/signup">まだアカウントをお持ちでない方</router-link>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import InfoInputForm from "../template/InfoInputForm.vue";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default {
  name: "LoginPageView",
  components: {
    InfoInputForm,
  },
  data: function () {
    return {
      email: undefined,
      password: undefined,
      user: undefined,
      error: "",
    };
  },
  methods: {
    googleSignIn: function () {
      const provider = new GoogleAuthProvider();
      console.log("button pressed");
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((result) => {
          console.log("logged in!");
          this.user = result.user;
          this.$router.push("/mypage");
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + ", " + errorMessage);
        });
    },
    login: function () {
      this.error = null;
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          this.user = userCredential.user;
          console.log("logged in!");
          this.$router.push("/mypage");
        })
        .catch((error) => {
          console.log(this.email, this.password);
          const errorCode = error.code;
          const errorMessage = error.message;

          console.log("errorcode: " + errorCode);
          console.log("error Message: " + errorMessage);

          switch (errorCode) {
            case "auth/user-not-found":
              this.error = "ユーザーが見つかりませんでした。";
              break;
            case "auth/missing-email":
              this.error = "メールアドレス又はパスワードを入力してください。";
              break;
            case "auth/wrong-password":
              this.error = "パスワードが間違っています。";
              break;
            case "auth/invalid-email":
              this.error = "メールアドレスの形式が間違っています。";
              break;
            default:
              this.error =
                "エラーが発生しました。時間をおいてもう一度おためしいただくか、開発者までお問い合わせください。";
          }
        });
    },
    setEmail(value) {
      this.email = value;
    },
    setPassword(value) {
      this.password = value;
    },
  },
};
</script>
