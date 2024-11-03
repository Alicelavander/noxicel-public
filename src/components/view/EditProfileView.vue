<template>
  <v-main>
    <v-container fluid>
      <v-form class="ml-7 my-5 mr-10" ref="form">
        <h1 class="my-3">プロフィールを編集</h1>
        <v-text-field density="compact" v-model="name" :counter="20" label="名前" />
        <v-text-field density="compact" disabled v-model="email" label="メールアドレス" />
        <v-file-input v-model="image" accept="image/*" label="プロフィール画像をアップロード" />
        <v-row justify="end">
          <v-btn color="secondary" class="mr-4" @click="submit">
            プロフィールを更新
          </v-btn>
        </v-row>
      </v-form>
    </v-container>
  </v-main>
</template>

<script>
import { getAuth, updateProfile, updateEmail } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


export default {
  data: () => ({
    name: '',
    email: '',
    image: [],
    photoURL: '',
  }),
  mounted() {
    const user = getAuth().currentUser;
    if (user) {
      this.name = user.displayName;
      this.email = user.email;
    }
  },
  methods: {
    submit() {
      const user = getAuth().currentUser;
      this.photoURL = user.photoURL;
      if (this.image.length != 0) {
        const storage = getStorage();
        const storageRef = ref(storage, `${user.uid}/profilePhoto`);
        uploadBytes(storageRef, this.image[0]).then((snapshot) => {
          console.log(snapshot.ref);
          getDownloadURL(storageRef)
            .then((url) => {
              console.log('Uploaded image to: ' + url);
              this.photoURL = url;
              updateProfile(user, {
                displayName: this.name, photoURL: this.photoURL
              }).then(() => {
                if (this.email != user.email) {
                  updateEmail(user, this.email).then(() => {
                    this.$router.push('/mypage');
                    console.log('log');
                  }).catch((error) => {
                    console.log(error);
                  });
                }
                this.$router.push('/mypage');
              }).catch((error) => {
                console.log(error);
              });
            })
            .catch((error) => {
              console.log(error)
            });
        });
      } else {
        updateProfile(user, {
          displayName: this.name, photoURL: this.photoURL
        }).then(() => {
          if (this.email != user.email) {
            updateEmail(user, this.email).then(() => {
              this.$router.push('/mypage');
              console.log('log');
            }).catch((error) => {
              console.log(error);
            });
          }
          this.$router.push('/mypage');
        }).catch((error) => {
          console.log(error);
        });
      }
    }
  }
}
</script>
