const initialState = {
    description: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'ADD_ITEM':
            return {
                ...state,
                description: action.payload
            };
        case 'EDIT_ITEM':
                return {
                    ...state,
                    description: action.payload
                };
        case 'CART_ITEM':
                return {
                        ...state,
                        description: action.payload
                    };
        default:
            return state;
    }
};