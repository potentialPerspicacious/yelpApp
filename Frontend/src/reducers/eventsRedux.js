const initialState = {
    description: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'ADD_EVENT':
            return {
                ...state,
                description: action.payload
            };
        case 'REGISTER_EVENT':
                return {
                    ...state,
                    description: action.payload
                };
        default:
            return state;
    }
};