import { createVNode, patch } from '../../lib/virtual-dom.js'
import DevPanel from '../Helpers/devPanel.js'
import store from '../store/initialstore.js'
import Component from '../components/component.js'
import { setFields, setGameState, setSettings } from './fields.js'
import { camelCase } from '../Helpers/Helpers.js'
import actions from '../store/actions.js'
import audio from '../../lib/sfx.js'
import Game from './Game.js'

export default class VirtualDOM extends Component {
    constructor (root) {
        super({ store })
        this.root = root
        this.render = this.renderVDOM
        this.renderVDOM()
    }

    renderMatrix () {
        this.renderVDOM()
    }
    
    renderInputsValue () {
        this.renderVDOM()
    }

    renderGameState () {
        this.renderVDOM()
    }

    renderError () {
        this.renderVDOM()
    }

    /** for dev */
    getMatrixCellClass = (cell) => {
        if (String(cell).split('.')[1]) {
            return 'c_ship_error'
        }
        if (cell >= 10) {
            return 'c_ship'
        }
        if (cell === 1) {
            return 'c_1'
        }
        if (cell === 3) {
            return 'c_3'
        }
        if (cell === 4) {
            return 'c_4'
        }
        if (cell === 8) {
            return 'c_8'
        }
        if (cell === 9) {
            return 'c_9'
        }
        return 'empty'
    }
    matrixCountValue = (target) => {
        let count3 = 0
        let count0 = 0
        let count1 = 0
        let count9 = 0
        let countS = 0

        store.state[target].matrix.map(row =>
            row.map(cell => {
                if (cell === 3) {
                    count3++
                }
                if (cell === 0) {
                    count0++
                }
                if (cell === 1) {
                    count1++
                }
                if (cell === 9) {
                    count9++
                }
                if (cell >= 10) {
                    countS++
                }
            }),
        )

        return createVNode('div', { class: 'matrix-info' }, [
            'cells counter',
            createVNode('div', { class: 'matrix-info-body' }, [
                createVNode('span', {}, [`ships: ${countS}`]),
                createVNode('span', {}, [`0: ${count0}`]),
                createVNode('span', {}, [`1: ${count1}`]),
                createVNode('span', {}, [`3: ${count3}`]),
                createVNode('span', {}, [`9: ${count9}`]),
            ]),

        ])
    }
    matrixToHTML = (target) => {
        return createVNode('div', { class: 'matrix' },
            store.state[target].matrix.map((row, x) =>
                createVNode('div', { class: 'matrix-row' },
                    row.map((cell, y) => {
                        // todo! убрать return
                        return createVNode('span', {
                            class: `matrix-item ${this.getMatrixCellClass(
                                cell)}`,
                            style: `width:${store.state.settings.cellSize}px; height:${store.state.settings.cellSize}px;`,
                        }, [
                            createVNode('span',
                                { class: `matrix-item-tooltip` },
                                [`${x}:${y}`]),
                            cell,
                        ])
                    }),
                ),
            ),
        )
    }
    /** for dev */

    fieldsBody = (target) => {
        return store.state[target].matrix.length ? createVNode('div',
            { class: 'field_container' }, [
                createVNode('div', { class: 'name' }, [store.state.settings[camelCase(target + ' name')]]),
                createVNode('div', {class: 'field', 'data-target': target},
                    store.state.gameState === 'error' ?
                        [
                            createVNode('div',
                                {
                                    class: 'field-error',
                                    style: `width:${store.state.settings.cellSize *
                                    store.state.settings.fields.x}px; height:${store.state.settings.cellSize *
                                    store.state.settings.fields.y}px;`,
                                }, [
                                    createVNode('div', {
                                        class: 'field-error-image',
                                        style: 'background-image: url(data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNjQgNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbD0iI2VmY2MwMCIgZD0iTTMwLjE2LDExLjUxLDYuODQsNTEuOWEyLjEzLDIuMTMsMCwwLDAsMS44NCwzLjE5SDU1LjMyYTIuMTMsMi4xMywwLDAsMCwxLjg0LTMuMTlMMzMuODQsMTEuNTFBMi4xMywyLjEzLDAsMCwwLDMwLjE2LDExLjUxWiIvPjxwYXRoIGZpbGw9IiMyNTM1MzUiIGQ9Ik0yOSw0NmEzLDMsMCwxLDEsMywzQTIuODgsMi44OCwwLDAsMSwyOSw0NlptMS4wOS00LjY2LS43Ni0xNWg1LjI2bC0uNzMsMTVaIi8+PC9zdmc+)',
                                    }),
                                    createVNode('span', {
                                        class: 'field-error-text',
                                    }, ['Слишком много кораблей!']),
                                ]
                            )
                        ] :
                        setFields(target),
                ),

                this.shipCountValue(target),
                // this.matrixToHTML(target), /** for dev */
            ]) : ''
    }
    
    createPanel = () => createVNode('div', { class: 'fields_panel' }, [
        createVNode('div', { class: 'state' }, [
            store.state.error ? createVNode("div", { class: "error" }, ["Ошибка расстановки кораблей!"]) : "",
            // createVNode("span", { class: "info" }, [store.state.turn]),
        ]),
        createVNode('div', { class: 'fields_panel_game_state' }, setGameState()),
        createVNode("div", { class: "win_count_block" }, [
            createVNode("div", { class: "win_count_block_item" }, [store.state.winCount.player]),
            createVNode("span", { class: "win_count_block_item" }, [":"]),
            createVNode("div", { class: "win_count_block_item" }, [store.state.winCount.comp]),
        ]),
        createVNode('div', { class: 'fields_panel-btn-block' }, [
            createVNode('div', {
                class: `btn ${(store.state.error || store.state.gameState === 'error') ? 'disable' : ''}`,
                onclick: () => store.state.game.startGame(),
            }, [
                store.state.gameState === 'gameOver' ? 'Ещё раз' : store.state.gameState === 'play' ? 'Сбросить' : 'Играть'
            ]),
            // createVNode("div", {class: `btn ${store.state.error ?
            // "disable" : ""}`, onclick: () => location.reload()},
            // ["reset"]), createVNode("div", {class: `btn
            // ${store.state.error ? "disable" : ""}`, onclick: () =>
            // store.state.player.compShootHandler()}, ["comp shoot"]),
        ]),
    ])

    shipCountValue(target) {
        let ships_count = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            "all": 0
        }

        store.state[target].ships.map(ship => {
            if (ship.l > 0) {
                ships_count[ship.s]++
                ships_count['all']++
            }
        })

        return createVNode('div', { class: 'field-info'}, [
            createVNode("div", {class: 'field-info-title'}, ["Всего кораблей: " + ships_count['all']]),
            createVNode('div', { class: 'field-info-items' }, [
                createVNode("div", {class: 'field-info-item'}, [
                    createVNode("div", {class: 'field-info-ship'}, [
                        createVNode("div", {class: 'field-info-ship-cell'}),
                        createVNode("div", {class: 'field-info-ship-cell'}),
                        createVNode("div", {class: 'field-info-ship-cell'}),
                        createVNode("div", {class: 'field-info-ship-cell'}),
                    ]),
                    " - " + ships_count['4']
                ]),
                createVNode("div", {class: 'field-info-item'}, [
                    createVNode("div", {class: 'field-info-ship'}, [
                        createVNode("div", {class: 'field-info-ship-cell'}),
                        createVNode("div", {class: 'field-info-ship-cell'}),
                        createVNode("div", {class: 'field-info-ship-cell'}),
                    ]),
                    " - " + ships_count['3']
                ]),
                createVNode("div", {class: 'field-info-item'}, [
                    createVNode("div", {class: 'field-info-ship'}, [
                        createVNode("div", {class: 'field-info-ship-cell'}),
                        createVNode("div", {class: 'field-info-ship-cell'}),
                    ]),
                    " - " + ships_count['2']
                ]),
                createVNode("div", {class: 'field-info-item'}, [
                    createVNode("div", {class: 'field-info-ship'}, [
                        createVNode("div", {class: 'field-info-ship-cell'})
                    ]),
                    " - " + ships_count['1']
                ]),
            ])
        ])
    }

    container () {
        return createVNode('div', { class: 'container' }, [
            // createVNode('div', { class: 'log_body' }, DevPanel),
            createVNode('div', { class: 'settings' }, [setSettings()]),
            createVNode('div', {
                class: `fields_body ${store.state.winner ? 'fields_winner_' + store.state.winner : ''}`
            }, [
                this.fieldsBody('player'),
                this.fieldsBody('comp'),
            ]),
            this.createPanel(),
            createVNode("div", { class: "audio" }, audio.createHtml()),
        ])
    }

    renderVDOM = () => {
        patch(this.container(), this.root)
    }
}