import { createStore } from 'vuex'

export const store = createStore({
  state() {
    return {
      courseId: -1,
      wordId: -1,
      wordsId: -1,
      submitText: ''
    }
  },
  mutations() {

  }
})
