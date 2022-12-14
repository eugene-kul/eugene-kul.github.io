import store from '../store/initialstore.js'
import { createVNode } from '../../lib/virtual-dom.js'

const log_btn = (callback, text) => createVNode('div',
    { class: 'log_btn', onclick: callback }, [text])

export default [
    log_btn(() => console.log(store), 'console.log(store)'),
    log_btn(() => console.log(store.state), 'console.log(state)'),
    log_btn(() => console.log(store.state.player), 'console.log(player)'),
    log_btn(() => console.log(store.state.comp), 'console.log(comp)'),
]


