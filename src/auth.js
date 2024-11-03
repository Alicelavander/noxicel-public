export default {
  namespaced: true,
  state: {
    tenant: '',
    userId: '',
    token: ''
  },
  mutations: {
    create(state, data) {
      state.tenant = ''
      state.token = data.token
      state.userId = data.user_id
    },
    destroy(state) {
      state.tenant = ''
      state.userId = ''
      state.token = ''
    }
  },
  actions: {
    create({ commit, dispatch }, data) {
      dispatch(
        'http/post',
        { url: '/auth', data, error: 'message.unauthorized' },
        { root: true }
      ).then(res => commit('create', res.data))
        .catch(err => err)
    },
    destroy({ commit, dispatch }, data) {
      dispatch(
        'http/delete',
        { url: '/auth', data },
        { root: true }
      ).then(res => commit('create', res.data))
        .catch(err => err)
        // logout anyway ...
        .finally(() => commit('destroy'))
    }
  }
}
