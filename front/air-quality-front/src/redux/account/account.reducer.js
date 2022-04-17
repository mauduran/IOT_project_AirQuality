import AccountActionTypes from "./account.types";

const INITIAL_STATE = {
    error: null,
    currentAccount: null,
    profile: null,
    successMessage: null,
    fetchingAccount: false,
}

const accountReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case AccountActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentAccount: action.payload,
                error: null,
                successMessage: null,
            }
        case AccountActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentAccount: null,
                error: null,
                successMessage: null,
            }
        case AccountActionTypes.CHANGE_DESCRIPTION_SUCCESS:
            let { description } = action.payload;
            return {
                ...state,
                error: null,
                successMessage: action.payload.message,
                profile: { ...state.profile, description },
            }
        case AccountActionTypes.CHANGE_TITLE_SUCCESS:
            let { title } = action.payload;
            return {
                ...state,
                error: null,
                successMessage: action.payload.message,
                profile: { ...state.profile, title },
            }

        case AccountActionTypes.CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                error: null,
                successMessage: action.payload
            }

        case AccountActionTypes.GET_ACCOUNT_PROFILE_SUCCESS:
            return {
                ...state,
                error: null,
                successMessage: null,
                profile: action.payload.profile,
                fetchingAccount: false,
            }

        case AccountActionTypes.GET_ACCOUNT_PROFILE_START:
            return {
                ...state,
                error: null,
                successMessage: null,
                fetchingAccount: true,
            }


        case AccountActionTypes.SIGN_IN_FAILURE:
        case AccountActionTypes.SIGN_OUT_FAILURE:
        case AccountActionTypes.SIGN_UP_FAILURE:
        case AccountActionTypes.CHANGE_PASSWORD_FAILURE:
        case AccountActionTypes.CHANGE_TITLE_FAILURE:
        case AccountActionTypes.CHANGE_DESCRIPTION_FAILURE:
        case AccountActionTypes.GET_ACCOUNT_PROFILE_FAILURE:
            return {
                ...state,
                error: action.payload,
                successMessage: null,
                fetchingAccount: false,
            }
        default: return state;
    }
}

export default accountReducer;