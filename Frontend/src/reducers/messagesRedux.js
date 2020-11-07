const initialState = {
    description: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'MESSAGE_INIT':
            return {
                ...state,
                description: action.payload
            };
        case 'MESSAGE_REPLY':
                return {
                    ...state,
                    description: action.payload
                };
        default:
            return state;
    }
};