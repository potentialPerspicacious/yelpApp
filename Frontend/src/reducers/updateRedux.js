const initialState = {
    description: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'USER_UPDATED':
            return {
                ...state,
                description: action.payload
            };
        default:
            return state;
    }
};