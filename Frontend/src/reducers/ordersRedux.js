const initialState = {
    description: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'PLACE_ORDER':
            return {
                ...state,
                description: action.payload
            };
        case 'CANCEL_ORDER':
                return {
                    ...state,
                    description: action.payload
                };
        case 'UPDATE_RORDER':
                    return {
                        ...state,
                        description: action.payload
                    };
        default:
            return state;
    }
};