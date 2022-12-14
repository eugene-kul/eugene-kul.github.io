import Game from './components/Game.js'
import actions from './store/actions.js'
import VirtualDOM from './components/VirtualDOM.js'
import store from './store/initialstore.js'

// todo: вынести на фронт
const settings = {
    playerName: 'PLAYER',
    compName: 'COMP',
    cellSize: 20,
    maxShipCount: 27,
    fields: {
        x: 32,
        y: 32,
    },
}
actions.set('settings', settings)
actions.set('inputsValue', settings)

actions.set('game', new Game(store.state.settings))
actions.set('VirtualDOM', new VirtualDOM(document.getElementById('root')))


// показ и скрытие настроек
document.getElementById('root').addEventListener('mousedown', e => {
    let settings = document.querySelector('.settings_content')
    if (!e.target.closest('.settings')) {
        settings.classList.remove('settings_show')
    } else if (!e.target.closest('.settings_content')) {
        settings.classList.toggle('settings_show')
    }
})





