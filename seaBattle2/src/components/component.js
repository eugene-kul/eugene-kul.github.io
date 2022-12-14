import Store from '../store/store.js'

export default class Component {
    constructor (props = {}) {
        if (props.store instanceof Store && 'render' in this) {
            props.store.events.subscribe('changeState', () => this.render())
        }
        if (props.store instanceof Store && 'renderGameState' in this) {
            props.store.events.subscribe('changeGameState', () => this.renderGameState())
        }
        if (props.store instanceof Store && 'renderMousePos' in this) {
            props.store.events.subscribe('changeMousePos', () => this.renderMousePos())
        }
        if (props.store instanceof Store && 'renderMatrix' in this) {
            props.store.events.subscribe('changeMatrix', () => this.renderMatrix())
        }
        if (props.store instanceof Store && 'renderPoints' in this) {
            props.store.events.subscribe('changePoints', () => this.renderPoints())
        }
        if (props.store instanceof Store && 'renderTurn' in this) {
            props.store.events.subscribe('changeTurn', () => this.renderTurn())
        }
        if (props.store instanceof Store && 'renderPoints' in this) {
            props.store.events.subscribe('changePoints', () => this.renderPoints())
        }
        if (props.store instanceof Store && 'renderSettings' in this) {
            props.store.events.subscribe('changeSettings', () => this.renderSettings())
        }
        if (props.store instanceof Store && 'renderInputsValue' in this) {
            props.store.events.subscribe('changeInputsValue', () => this.renderInputsValue())
        }
        if (props.store instanceof Store && 'renderError' in this) {
            props.store.events.subscribe('changeError', () => this.renderError())
        }
    }
}