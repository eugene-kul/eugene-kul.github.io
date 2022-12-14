import Store from './store.js'
import mutations from './mutations.js'

export default new Store({
    mutations,
    state: {
        gameState: '',
        player: {
            ships: [],
            matrix: [],
        },
        comp: {
            ships: [],
            matrix: [],
        },
        settings: {},
        winCount: {},
    },
    inputsValue: {}
})