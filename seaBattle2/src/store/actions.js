import store from './initialstore.js'
import { camelCase } from '../Helpers/Helpers.js'

export default {
    set (key, payload) {
        store.dispatch(camelCase('set ' + key), payload)
    },
    edit (key, payload) {
        store.dispatch(camelCase('edit ' + key), payload)
    },
    remove (key, payload) {
        store.dispatch(camelCase('remove ' + key), payload)
    },
}
