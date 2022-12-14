export default {
    setGameState (state, payload) {
        state.gameState = payload
        return state
    },
    setTurn (state, payload) {
        state.turn = payload
        return state
    },
    setWinner (state, payload) {
        state.winner = payload
        return state
    },
    setError (state, payload) {
        state.error = payload
        return state
    },
    setMousePos (state, payload) {
        state.mousePos = payload
        return state
    },
    setPlayers (state, payload) {
        state[payload.target] = payload
        return state
    },
    setSettings: (state, payload) => {
        state.settings = payload
        return state
    },
    setInputsValue: (state, payload) => {
        state.inputsValue = payload
        return state
    },
    setGame: (state, payload) => {
        state.game = payload
        return state
    },
    setVirtualDOM: (state, payload) => {
        state.VirtualDOM = payload
        return state
    },
    setWinCount: (state, payload) => {
        state.winCount = payload
        return state
    },
    editWinCount: (state, payload) => {
        state.winCount[payload.target] = payload.value
        return state
    },
    setShips: (state, payload) => {
        state[payload.target].ships[payload.ship.i] = payload.ship
        return state
    },
    removeShips: (state, payload) => {
        state[payload.target].ships = []
        return state
    },
    editShip: (state, payload) => {
        state[payload.target].ships[payload.index] = payload.ship
        return state
    },
    setPoints: (state, payload) => {
        state[payload.target].points = payload.points
        return state
    },
    setMatrix: (state, payload) => {
        state[payload.target].matrix = payload.matrix
        return state
    },
}