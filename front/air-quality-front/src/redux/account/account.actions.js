import AccountActionTypes from "./account.types";

export const checkAccountSession = () => ({
    type: AccountActionTypes.CHECK_ACCOUNT_SESSION
});

export const getAccountProfileStart = () => ({
    type: AccountActionTypes.GET_ACCOUNT_PROFILE_START,
})

export const getAccountProfileFailure = (error) => ({
    type: AccountActionTypes.GET_ACCOUNT_PROFILE_FAILURE,
    payload: error,
})

export const getAccountProfileSuccess = (accountProfile) => ({
    type: AccountActionTypes.GET_ACCOUNT_PROFILE_SUCCESS,
    payload: accountProfile,
})

export const signInSuccess = (loginResponse) => ({
    type: AccountActionTypes.SIGN_IN_SUCCESS,
    payload: loginResponse
})

export const signInFailure = (error) => ({
    type: AccountActionTypes.SIGN_IN_FAILURE,
    payload: error
})

export const signInStart = usernameAndPassword => ({
    type: AccountActionTypes.SIGN_IN_START,
    payload: usernameAndPassword
})

export const signOutStart = () => ({
    type: AccountActionTypes.SIGN_OUT_START
})

export const signOutSuccess = () => ({
    type: AccountActionTypes.SIGN_OUT_SUCCESS
})

export const signOutFailure = (error) => ({
    type: AccountActionTypes.SIGN_OUT_FAILURE,
    payload: error
})

export const signUpStart = (userCredentials) => ({
    type: AccountActionTypes.SIGN_UP_START,
    payload: userCredentials
})

export const signUpSuccess = (response) => ({
    type: AccountActionTypes.SIGN_UP_SUCCESS,
    payload: response
})

export const signUpFailure = (error) => ({
    type: AccountActionTypes.SIGN_UP_FAILURE,
    payload: error
})

export const changePasswordStart = (newAccountCredentials) => ({
    type: AccountActionTypes.CHANGE_PASSWORD_START,
    payload: newAccountCredentials
})

export const changePasswordSuccess = (message) => ({
    type: AccountActionTypes.CHANGE_PASSWORD_SUCCESS,
    payload: message
})

export const changePasswordFailure = (error) => ({
    type: AccountActionTypes.CHANGE_PASSWORD_FAILURE,
    payload: error
})

export const changeTitleStart = (newTitle) => ({
    type: AccountActionTypes.CHANGE_TITLE_START,
    payload: newTitle
})

export const changeTitleSuccess = (response) => ({
    type: AccountActionTypes.CHANGE_TITLE_SUCCESS,
    payload: response
})

export const changeTitleFailure = (error) => ({
    type: AccountActionTypes.CHANGE_TITLE_FAILURE,
    payload: error
})

export const changeDescriptionStart = (newDescription) => ({
    type: AccountActionTypes.CHANGE_TITLE_START,
    payload: newDescription
})

export const changeDescriptionSuccess = (response) => ({
    type: AccountActionTypes.CHANGE_TITLE_SUCCESS,
    payload: response
})

export const changeDescriptionFailure = (error) => ({
    type: AccountActionTypes.CHANGE_TITLE_FAILURE,
    payload: error
})
