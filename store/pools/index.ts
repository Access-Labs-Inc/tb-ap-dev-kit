import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'

const namespaced = true

export default {
  namespaced,
  state,
  actions,
  getters,
  mutations
}
