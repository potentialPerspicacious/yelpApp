 const initialState = {
     description: {}
 };

 export default function(state = initialState, action){
    switch(action.type){
        case 'USER_LOGIN':
            return {
                ...state,
                description: action.payload
            };
        case 'USER_LOGOUT':
            return {};
        default:
            return state;
    }
 };