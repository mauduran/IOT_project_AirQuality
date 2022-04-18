import { createSelector } from 'reselect';

const selectPhone = state => state.phone;

export const selectPhoneNumber = createSelector(
    selectPhone,
    (phone) => phone.number
);

export const selectIsWaitingForVerification = createSelector(
    selectPhone,
    (phone) => phone.waitingForVerification
);

export const selectIsRegisteringPhone = createSelector(
    selectPhone,
    (phone) => phone.registeringPhone
);

export const selectIsVerifyingCode = createSelector(
    selectPhone,
    (phone) => phone.verifyingCode
);
