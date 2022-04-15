import { createSelector } from 'reselect';

const selectPhone = state => state.phone;

export const selectPhoneNumber = createSelector(
    selectPhone,
    (phone) => phone.number
);

export const selectIsWaitingForVerification = createSelector(
    selectPhone,
    (phone)=> phone.waitingForVerification
)