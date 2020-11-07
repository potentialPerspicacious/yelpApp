const initialState = {
    description: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'ADD_REVIEW':
            return {
                ...state,
                description: action.payload
            };
        default:
            return state;
    }
};