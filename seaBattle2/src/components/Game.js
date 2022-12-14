import store from '../store/initialstore.js'
import actions from '../store/actions.js'
import Component from './component.js'
import { gameItem } from './GameItem.js'

export default class Game extends Component {
    constructor () {
        super({ store })
        this.player = new Proxy(
            gameItem({ target: 'player' }), store.proxy()
        )
        this.comp = new Proxy(
            gameItem({ target: 'comp', hideShips: true }), store.proxy()
        )
        this.init()
    }

    init () {
        actions.set('turn', '---')
        actions.set('gameState', 'prepare')
        actions.set('players', this.player)
        actions.set('players', this.comp)

        this.player.init()
        this.comp.init()

        actions.set('winCount', { player: 0, comp: 0 })
    }

    renderSettings () {
        actions.set('inputsValue', { ...store.state.settings })
    }

    renderMatrix () {
        let error = store.state.player.matrix.some(
            row => row.find(cell => String(cell).split('.')[1])
        )
        actions.set('error', error)
    }

    renderTurn () {
        if (store.state.turn === 'comp') {
            this.player.compShootHandler()
        }
    }

    resetGame() {
        if (store.state.gameState === "error") {
            actions.set('gameState', 'prepare')
        }

        actions.set('winner', '')

        actions.set('settings', { ...store.state.inputsValue })

        this.player.resetGame()
        this.comp.resetGame()
        
        store.state.VirtualDOM.renderVDOM()
    }

    startGame () {
        if (store.state.gameState === 'gameOver') {
            actions.set('winner', '')
    
            this.player.resetGame()
            this.comp.resetGame()

            actions.set('gameState', 'play')

            if (store.state.turn === 'comp') {
                this.player.compShootHandler()
            }
        } else if (store.state.gameState === 'play') {
            this.player.resetGame()
            this.comp.resetGame()

            actions.set('gameState', 'prepare')
            actions.set('turn', '---')
        } else if (!store.state.error) {
            actions.set('gameState', 'play')
            actions.set('turn', Math.random() > Math.random() ? 'player' : 'comp')
        }
    }
}
