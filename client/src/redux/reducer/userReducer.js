const initialState = {
    error: '',
    detials: {},
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                detials: action.payload,
            };

        case 'LOGIN_FAIL':
            return {
                error: action.payload,
            };

        case 'REGISTER_SUCCESS':
            return {
                ...state,
                detials: action.payload,
            };

        case 'REGISTER_FAIL':
            return {
                error: action.payload,
            };

        default:
            return state;
    }
};
