import store from '../store/initialstore.js'
import { createVNode } from '../../lib/virtual-dom.js'
import actions from '../store/actions.js'

export const setFields = (target) => {
    return store.state[target].matrix.map((cells, x) =>
        createVNode('div', { class: `row` },
            cells.map((cell, y) =>
                createVNode(
                    'div',
                    {
                        class: `cell`,
                        onclick: e => store.state.gameState === 'play' && target === 'comp' && store.state[target].mouseEventClick(e),
                        'data-x': x,
                        'data-y': y,
                        style: `width:${store.state.settings.cellSize}px; height:${store.state.settings.cellSize}px;`,
                    },
                    [
                        // //(y+10).toString(36).toUpperCase() +" "+ (x+1), // Буквенное обозначене
                        // createVNode('span', { class: 'cell_text' }, [(y+10).toString(36).toUpperCase() +" "+ (x+1)]),
                        setShips({ x, y }, target),
                        // setPoints({ x, y }, target),
                    ],
                ),
            ),
        )
    )
}

const getShipCount = (target) => {
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

    return [
        createVNode("div", {class: 'field-info-item'}, ["Всего кораблей: " + ships_count['all']]),
        createVNode("div", {class: 'field-info-item'}, ["4-х палубных: " + ships_count['4']]),
        createVNode("div", {class: 'field-info-item'}, ["3-х палубных: " + ships_count['3']]),
        createVNode("div", {class: 'field-info-item'}, ["2-х палубных: " + ships_count['2']]),
        createVNode("div", {class: 'field-info-item'}, ["1-о палубных: " + ships_count['1']]),
    ]
}

// отрисовка кораблей
const setShips = (point, target) => {
    let payload = String(store.state[target].matrix[point.x][point.y]). split('.')
    let error = payload[1] | 0
    let matrix_value = Number(payload[0])

    if (matrix_value >= 10 && (store.state.gameState === 'gameOver' || !store.state[target].hideShips)) {
        return createVNode(
            'div',
            {
                class: `ship_cell`,
                'data-ship': matrix_value,
                'data-error': error,
                onmousedown: e => store.state.gameState === 'prepare' && target === 'player' && store.state[target].shipDragStart(e),
                ontouchstart: e => store.state.gameState === 'prepare' && target === 'player' && store.state[target].shipDragStart(e),
            })
    }

    if (matrix_value === 3 && target !== 'comp') {
        // return createVNode("div", {
        // 	class: `cell_ship-point`,
        // }, [])
    }

    if (matrix_value === 1) {
        return createVNode('div', {class: `cell_shoot-point`})
    }

    if (matrix_value === 8) {
        return createVNode('div', {class: `cell_ship-shooting`})
    }

    if (matrix_value === 9) {
        return createVNode('div', {class: `cell_ship-death`})
    }

    return ''
}

const setPoints = (point, target) => {
    let index = store.state[target].points.findIndex(
        item => JSON.stringify(item) === JSON.stringify(point)
    )
    if (index > -1) {
        return index > -1 ? createVNode("div", {class: "cell_point_shoot"}) : ''
    }

    return ''
}

export const setGameState = () => {
    if (store.state.gameState === 'prepare') {
        return ['Перетаскивай свои корабли, потом начинай бой!']
    }
    if (store.state.gameState === 'play') {
        return ['Игра идет!']
    }
    if (store.state.gameState === 'gameOver') {
        return ['Пизда! Победил ' + store.state.turn]
    }
}

export const setSettings = () => {
    let ship_count = 0

    for (let s = 4; s > 0; s--) {
        for (let n = 0; n <= store.state.inputsValue.maxShipCount - s; n++) {
            ship_count++
        }
    }

    return createVNode('div', { class: 'settings_container' }, [
        createVNode('img', {
            class: 'settings_icon',
            src: "img/settings_icon.svg",
        }),
        createVNode('div', {class: 'settings_content'}, [
            createVNode('div', {class: 'settings_item'}, [
                createVNode('div', {class: 'settings_item_text'}, ["Размер ячеек: " + store.state.settings.cellSize]),
                createVNode('input', {
                    type: "range",
                    name: "cellSize",
                    min: "20",
                    max: "50",
                    class: 'settings_item_input',
                    value: store.state.settings.cellSize,
                    oninput: e => actions.set('settings', { ...store.state.settings, cellSize: e.target.value })
                }),
            ]),
            createVNode('div', {class: 'settings_item'}, [
                createVNode('div', {class: 'settings_item_text'}, ["Размеры поля: " +store.state.inputsValue.fields.x + "x" + store.state.inputsValue.fields.y]),
                createVNode('input', {
                    type: "range",
                    name: "fields.x",
                    min: "4",
                    max: "32",
                    disabled: store.state.gameState === 'play',
                    class: 'settings_item_input',
                    value: store.state.settings.fields.x,
                    oninput: e => {
                        actions.set('inputsValue', {
                            ...store.state.inputsValue,
                            fields: changeFields('x', e.target.value),
                        })
                    },
                    onchange: () => {
                        store.state.game.resetGame()
                    }
                }),
                createVNode('input', {
                    type: "range",
                    name: "fields.y",
                    min: "4",
                    max: "32",
                    disabled: store.state.gameState === 'play',
                    class: 'settings_item_input',
                    value: store.state.settings.fields.y,
                    oninput: e => {
                        actions.set('inputsValue', {
                            ...store.state.inputsValue,
                            fields: changeFields('y', e.target.value),
                        })
                    },
                    onchange: () => {
                        store.state.game.resetGame()
                    }
                }),
            ]),
            createVNode('div', {class: 'settings_item'}, [
                createVNode('div', {class: 'settings_item_text'}, ["Кол-во кораблей: " + ship_count]),
                createVNode('input', {
                    type: "range",
                    name: "maxShipCount",
                    min: "1",
                    max: "27",
                    disabled: store.state.gameState === 'play',
                    class: 'settings_item_input',
                    value: store.state.inputsValue.maxShipCount,
                    oninput: e => {
                        actions.set('inputsValue', {
                            ...store.state.inputsValue,
                            maxShipCount: e.target.value,
                        })
                    },
                    onchange: () => {
                        store.state.game.resetGame()
                    }
                }),
            ]),
        ]),
    ])
}

function changeFields(target, value) {
    if (target === "x") {
        return {
            ...store.state.settings.fields,
            x: Number(value),
        }
    }

    if (target === "y") {
        return {
            ...store.state.settings.fields,
            y: Number(value),
        }
    }
}
