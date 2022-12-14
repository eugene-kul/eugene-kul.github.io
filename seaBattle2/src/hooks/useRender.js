import { camelCase } from '../Helpers/Helpers.js'
import store from '../store/initialstore.js'

export function useRender (callback, deps) {
    for (const dep of deps) {
        const changeName = camelCase('change ' + dep)
        store.events.subscribe(changeName, (state) => callback(state))
    }

}