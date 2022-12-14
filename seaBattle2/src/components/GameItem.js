import store from '../store/initialstore.js'
import actions from '../store/actions.js'
import { useRender } from '../hooks/useRender.js'
import audio from '../../lib/sfx.js'

/** this.matrix - значения матрицы
 * 0 - пусто
 * 1 - выстрел мимо корабля
 * 3 - точки вокруг корабля
 * 4 - точки вокруг убитого корабля
 * 8 - подбитая палуба корабля
 * 9 - убитый корабль
 * 10 и больше - корабли
 * хх.1 - корабли с ошибкой
 */

/**
 * {int} x,y - координаты первой палубы корабля
 * {int} ship.l - жизни корабля = ship.s
 * {int} ship.s - длинна корабля
 * {int} ship.e - ошибка расстановки корабля (1/0)
 * {int} ship.r - поворот корабля (1/0)
 * {int} ship.i - index корабля
 */

export const gameItem = (props) => {
    const emptyMatrix = () => new Array(store.state.settings.fields.y).fill(0).map(() => Array(store.state.settings.fields.x).fill(0))
    const target = props.target
    let ships = store.state[props.target].ships
    let points = store.state[props.target].points
    let hideShips = props.hideShips | false
    let localPoints = []
    let localPointsAroundShip = []
    let matrix = emptyMatrix()
    let local_matrix = emptyMatrix()
    
    
    useRender(() => {
        matrix = store.state[target].matrix
    }, ['matrix'])
    
    useRender(() => {
        points = store.state[target].points
    }, ['points'])
    
    useRender(() => {
    
    }, ['turn'])
    
    /** getters */
    function getRandomFromMatrix (ship, counter = 0) {
        counter++
        
        let ship_points = []
        
        let x = Math.floor(Math.random() * local_matrix.length)
        let y = Math.floor(Math.random() * local_matrix[x].length)
        
        for (let i = 0; i < ship.s; i++) {
            let _x = ship.r === 0 ? x + i : x
            let _y = ship.r === 1 ? y + i : y
            
            if (
                local_matrix[_x] !== undefined &&
                local_matrix[_x][_y] !== undefined &&
                local_matrix[_x][_y] === 0
            ) {
                // console.log('add', _x, _y)
                ship_points.push({ x: _x, y: _y })
            }
            else {
                // console.log('false', _x, _y)
                if (counter > 300) {
                    console.warn("maximum iteration for getRandomFromMatrix")
                    actions.set('gameState', 'error')
                    actions.set('error', true)
                    console.log(store.state.gameState)
                    return false
                }
                return getRandomFromMatrix(ship, counter)
            }
        }
        
        return ship_points[0]
    }
    
    function getShipErrors (ship) {
        let points = []
        for (let i = 0; i < ship.s; i++) {
            let x = ship.r === 0 ? ship.x + i : ship.x
            let y = ship.r === 1 ? ship.y + i : ship.y
            
            for (let pointX = x - 1; pointX <= x + 1; pointX++) {
                for (let pointY = y - 1; pointY <= y + 1; pointY++) {
                    if (
                        matrix[pointX] !== undefined &&
                        matrix[pointX][pointY] !== undefined &&
                        matrix[pointX][pointY] >= 10 &&
                        matrix[pointX][pointY] !== 10 + ship.i + (ship.e / 10)
                    ) {
                        if (points.findIndex(point => JSON.stringify(point) === JSON.stringify({ x: pointX, y: pointY })) === -1) {
                            points.push({ x: pointX, y: pointY })
                        }
                    }
                }
            }
        }
        return points
    }
    
    function getShipsOnPoint (point) {
        let _ships = []
        for (let ship of ships) {
            for (let i = 0; i < ship.s; i++) {
                let x = ship.r === 0 ? ship.x + i : ship.x
                let y = ship.r === 1 ? ship.y + i : ship.y
                if (point.x === x && point.y === y) {
                    _ships.push(ship)
                }
            }
        }
        
        return _ships
    }
    
    function getShipPoints (ship) {
        let shipPoints = []
        
        for (let i = 0; i < ship.s; i++) {
            let x = ship.r === 0 ? ship.x + i : ship.x
            let y = ship.r === 1 ? ship.y + i : ship.y
            shipPoints.push({ x, y })
        }
        
        return shipPoints
    }
    
    function getPointAroundShip (ship) {
        let points = []
        for (let i = 0; i < ship.s; i++) {
            let x = ship.r === 0 ? ship.x + i : ship.x
            let y = ship.r === 1 ? ship.y + i : ship.y
            
            for (let pointX = x - 1; pointX <= x + 1; pointX++) {
                for (let pointY = y - 1; pointY <= y + 1; pointY++) {
                    if (
                        matrix[pointX] !== undefined &&
                        matrix[pointX][pointY] === 3 &&
                        points.findIndex(item => JSON.stringify(item) === JSON.stringify({ x: pointX, y: pointY })) === -1
                    ) {
                        points.push({ x: pointX, y: pointY })
                    }
                }
            }
        }
        return points
    }
    
    function getRandomFrom (object) {
        return object[Math.floor(Math.random() * object.length)]
    }
    
    /** setters */
    function setErrors (ship, error) {
        let errorPoints = getShipErrors(ship)
        
        refreshMatrix()
        
        for (const point of errorPoints) {
            let _ships = getShipsOnPoint(point)
            
            // todo! слишком много одинаковых кусков кода
            if (error) {
                actions.edit('ship',{ target, index: ship.i, ship: { ...ship, e: error } })
                
                _ships.map(_ship => {
                    actions.edit('ship', { target, index: _ship.i, ship: { ..._ship, e: error } })
                })
            }
            else {
                _ships.map(_ship => {
                    if (getShipErrors(_ship).length === 0) {
                        actions.edit('ship', { target, index: _ship.i, ship: { ..._ship, e: error } })
                    }
                })
            }
        }
        
        refreshMatrix()
    }
    
    function setPoints (object = []) {
        if (!object.length) {
            localPoints = []
            localPointsAroundShip = []
            
            matrix.map((row, x) => row.map((cell, y) => {
                localPoints.push({ x, y })
            }))
            actions.set('points', { target, points: localPoints })
        }
        else {
            actions.set('points', { target, points: object })
        }
    }
    
    function setPointsAroundPoint (point, ship) {
        if (ship.l === ship.s - 1) {
            localPointsAroundShip = []
        }
        
        const pushPoint = ({ x, y }) => {
            if (
                matrix[x] !== undefined &&
                matrix[x][y] !== undefined &&
                matrix[x][y] !== 1 &&
                matrix[x][y] !== 4 &&
                matrix[x][y] !== 8
            ) {
                localPointsAroundShip.push({ x, y })
            }
        }
        
        // постановка следующего хода после выстрела для самого умного кампа
        for (let j = -1; j <= 1; j === -1 ? j = 1 : j = 2) {
            let x = ship.r === 0 ? point.x + j : point.x
            let y = ship.r === 0 ? point.y : point.y + j
            
            pushPoint({ x, y })
            
            // добавить сюда условие, если уровень компа 2, то не выполнять
            // этот кусок кода
            if (ship.l === ship.s - 1) {
                x = ship.r === 0 ? point.x : point.x + j
                y = ship.r === 0 ? point.y + j : point.y
                
                pushPoint({ x, y })
            }
            else {
                for (let point of checkPointsAroundShipOnSecondShoot(ship)) {
                    removePoint(localPointsAroundShip, point)
                }
            }
        }
        
    }
    
    function checkPointsAroundShipOnSecondShoot (ship) {
        let points = []
        for (let i = 0; i < ship.s; i++) {
            // страшный цикл, который выполняется 2 раза со значениями i = -1 и
            // i = 1
            for (let j = -1; j <= 1; j === -1 ? j = 1 : j = 2) {
                let x = ship.r === 1 ? ship.x + j : ship.x + i
                let y = ship.r === 1 ? ship.y + i : ship.y + j
                
                if (matrix[x] !== undefined && matrix[x][y] !== undefined) {
                    points.push({ x, y })
                }
            }
        }
        return points
    }
    
    /** checkers */
    function checkEndGame () {
        let countS = 0
        
        local_matrix.map(row => row.map(cell => {
            if (cell >= 10) countS++
        }))
        
        if (countS === 0) {
            actions.set('winner', store.state.turn)
            actions.edit('winCount', { target, value: store.state.winCount[target] + 1 })
            actions.set('gameState', 'gameOver')
        }
    }
    
    /** handlers */
    function createRandomShips () {
        for (let s = 4; s > 0; s--) {
            for (let n = 0; n <= store.state.settings.maxShipCount - s; n++) {
                
                let ship = {
                    l: s,
                    s: s,
                    e: 0,
                    r: Math.random() > Math.random() ? 0 : 1,
                    i: ships.length,
                }
                
                let ship_coordinate = getRandomFromMatrix(ship)
                
                ship = { ...ship_coordinate, ...ship }
                
                addShip(ship)
            }
        }
    }
    
    function addShip (ship) {
        actions.set('ships', { target, ship })
        refreshLocalMatrix(shipsToMatrix())
    }
    
    function addShootPoint (point, value) {
        //if (target === "player") {
        if (localPointsAroundShip.length) {
            removePoint(localPointsAroundShip, point)
            removePoint(localPoints, point)
            setPoints(localPointsAroundShip)
        }
        else {
            removePoint(localPoints, point)
            setPoints(localPoints)
        }
        //}
        refreshLocalMatrix(matrixToMatrix(point, value))
    }
    
    function removePoint (object, point) {
        let index = object.findIndex(
            item => JSON.stringify(item) === JSON.stringify(point))
        
        if (index > -1) {
            object.splice(index, 1)
        }
    }
    
    function refreshMatrix () {
        refreshLocalMatrix(shipsToMatrix())
        actions.set('matrix', { target, matrix: shipsToMatrix() })
    }
    
    function refreshLocalMatrix (value) {
        local_matrix = value
    }
    
    function shipsToMatrix () {
        let _matrix = emptyMatrix()
        
        for (const ship of ships) {
            for (let i = 0; i < ship.s; i++) {
                let x = ship.r === 0 ? ship.x + i : ship.x
                let y = ship.r === 1 ? ship.y + i : ship.y
                
                for (let pointX = x - 1; pointX <= x + 1; pointX++) {
                    for (let pointY = y - 1; pointY <= y + 1; pointY++) {
                        if (
                            _matrix[pointX] !== undefined &&
                            _matrix[pointX][pointY] !== undefined &&
                            _matrix[pointX][pointY] !== 10 + ship.i + (ship.e / 10)
                        ) {
                            if (pointX === x && pointY === y) {
                                _matrix[pointX][pointY] = 10 + ship.i + (ship.e / 10)
                            }
                            else {
                                if (_matrix[pointX][pointY] < 10) {
                                    _matrix[pointX][pointY] = 3
                                }
                            }
                        }
                    }
                }
            }
        }
        
        return _matrix
    }
    
    function matrixToMatrix (point, value) {
        let _matrix = emptyMatrix()
        
        local_matrix.map((row, x) => {
            row.map((value, y) => {
                _matrix[x][y] = value
            })
        })
        
        _matrix[point.x][point.y] = value
        
        return _matrix
    }
    
    function localMatrixToMatrix () {
        let _matrix = emptyMatrix()
        
        local_matrix.map((row, x) => {
            row.map((value, y) => {
                _matrix[x][y] = value
            })
        })
        
        actions.set('matrix', { target, matrix: _matrix })
    }
    
    function compShootHandler () {
        let point = getRandomFrom(points)
        
        setTimeout(() => {
            moveHandler(point)
        }, 100)
    }
    
    function moveHandler (point) {
        if (store.state.gameState !== 'play') {
            return
        }
        
        let matrix_value = matrix[point.x][point.y]
        
        if (matrix_value >= 10) {
            shootOnShipHandler(point)
            if (store.state.turn === 'comp') {
                compShootHandler()
            }
        }
        if (matrix_value === 0 || matrix_value === 3 || matrix_value === 4) {
            shootOnEmptyHandler(point)
        }
        
        localMatrixToMatrix()
    }
    
    function shootOnShipHandler (point) {
        let ship_index = Math.floor(matrix[point.x][point.y]) - 10
        let ship = ships[ship_index]
        
        ship = { ...ship, l: ship.l - 1 }
        
        actions.edit('ship', { target, index: ship.i, ship })
        
        if (ship.l === 0) {
            for (const point of getPointAroundShip(ship)) {
                removePoint(localPoints, point)
                addShootPoint(point, 4)
            }
            
            for (const point of getShipPoints(ship)) {
                //if (target === "player") {
                localPointsAroundShip = []
                //}
                
                addShootPoint(point, 9)
            }
            
            audio.play(10)
            
            checkEndGame()
        }
        else {
            //if (target === "player") {
            setPointsAroundPoint(point, ship)
            //}
            
            addShootPoint(point, 8)
            audio.play(5)
        }
    }
    
    function shootOnEmptyHandler (point) {
        addShootPoint(point, 1)
        audio.play(4)
        actions.set('turn', store.state.turn === 'comp' ? 'player' : 'comp')
    }
    
    /** mouse events */
    const shipDragStart = (e) => {
        let ship_index = Math.floor(matrix[e.target.closest('.cell').dataset.x][e.target.closest('.cell').dataset.y]) - 10
        let ship = { ...ships[ship_index], e: 0 }
        let shipPoint = document.querySelector(`.field[data-target="${target}"] .cell[data-x="${ship.x.toString()}"][data-y="${ship.y.toString()}"]`)
        
        actions.edit('ship', { target, index: ship.i, ship: {} })
        
        setErrors(ship, 0)
        
        // подстановка фективного корабля, для отображения перетаскивания
        let shadowShip = document.createElement('div')
        shadowShip.classList.add(`ship`, `${ship.r === 0 ? 'columns' : 'rows'}`)
        for (let i = 0; i < ship.s; i++) {
            let shipCell = document.createElement('div')
            shipCell.classList.add('ship_cell')
            shipCell.style['minWidth'] = `${store.state.settings.cellSize}px`
            shipCell.style['minHeight'] = `${store.state.settings.cellSize}px`
            shadowShip.append(shipCell)
        }
        shipPoint.append(shadowShip)
        let shipCellsElements = shadowShip.children
        
        let x, y
        e.touches !== undefined ? x = e.targetTouches[0].clientX : x = e.x
        e.touches !== undefined ? y = e.targetTouches[0].clientY : y = e.y
        
        let chX = x, chY = y, shipX, shipY
        
        const onMouseMove = e => {
            e.touches !== undefined ? x = e.targetTouches[0].clientX : x = e.x
            e.touches !== undefined ? y = e.targetTouches[0].clientY : y = e.y
            
            shipX = Math.round(ship.x - ((chY - y) / store.state.settings.cellSize))
            shipY = Math.round(ship.y - ((chX - x) / store.state.settings.cellSize))
            
            if (shipX <= 0) shipX = 0
            if (shipX > store.state.settings.fields.y - 1) shipX = store.state.settings.fields.y - 1
            if ((shipX + ship.s) >= store.state.settings.fields.y && !ship.r) shipX = store.state.settings.fields.y - ship.s
            
            if (shipY <= 0) shipY = 0
            if (shipY > store.state.settings.fields.x - 1) shipY = store.state.settings.fields.x - 1
            if ((shipY + ship.s) >= store.state.settings.fields.x && ship.r) shipY = store.state.settings.fields.x - ship.s
            
            for (const shipCell of shipCellsElements) {
                shipCell.style.left = x - chX + 'px'
                shipCell.style.top = y - chY + 'px'
            }
        }
        
        const stopDrop = () => {
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', stopDrop)
            document.removeEventListener('touchmove', onMouseMove)
            document.removeEventListener('touchend', stopDrop)
            
            if (Math.abs(chX - x) < 1 && Math.abs(chY - y) < 1) {
                // корректировка корабля при повороте около правой и нижней
                // границы поля
                if ((ship.x + ship.s) > store.state.settings.fields.x && ship.r) ship.x = store.state.settings.fields.x - ship.s
                if ((ship.y + ship.s) > store.state.settings.fields.y && !ship.r) ship.y = store.state.settings.fields.y - ship.s
                
                ship = { ...ship, r: !ship.r ? 1 : 0 }
            }
            else {
                ship = { ...ship, x: shipX, y: shipY }
            }
            
            actions.edit('ship', { target, index: ship.i, ship })
            
            setErrors(ship, 1)
        }
        
        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', stopDrop)
        document.addEventListener('touchmove', onMouseMove)
        document.addEventListener('touchend', stopDrop)
    }
    const mouseEventClick = (e) => {
        if (target === store.state.turn) return
        
        let point = {
            x: Number(e.target.closest('.cell').dataset.x),
            y: Number(e.target.closest('.cell').dataset.y),
        }
        
        moveHandler(point)
    }
    
    const resetGame = () => {
        actions.remove('ships', { target })
        
        ships = store.state[target].ships
        
        local_matrix = emptyMatrix()
        
        setPoints()
        refreshMatrix()
        
        store.state.VirtualDOM.renderVDOM()
        
        init()
        
        store.state.VirtualDOM.renderVDOM()
    }
    
    // вызывается при инициализации
    const init = () => {
        // console.time(`mark-${target}`)
        
        createRandomShips()
        refreshMatrix()
        // target === "player" &&
        setPoints()
        // console.timeEnd(`mark-${target}`)
    }
    
    return {
        target,
        points,
        matrix,
        ships,
        hideShips,
        init,
        resetGame,
        shipDragStart,
        mouseEventClick,
        compShootHandler,
    }
}
