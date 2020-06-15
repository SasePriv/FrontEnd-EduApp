const initialState = {
    action: "closeModal"
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "OPEN_MODAL":
            return { ...state, action: "openModal" }
        case "CLOSE_MODAL":
            return { ...state, action: "closeModal" }
        default:
            return state
    }
}

export default reducer