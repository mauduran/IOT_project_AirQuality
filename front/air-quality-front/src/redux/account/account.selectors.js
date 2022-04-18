import { createSelector } from 'reselect';

const selectAccount = state => state.account;

export const selectAccountProfile = createSelector(
    selectAccount,
    (account) => account.profile
);

export const selectIsFetchingAccount = createSelector(
    selectAccount,
    (account) => account.fetchingAccount
);

export const selectCurrentAccountName = createSelector(
    selectAccount,
    (account) => account.currentAccount ? account.currentAccount.accountName: null
);

export const selectCurrentAccountTitle = createSelector(
    selectAccount,
    (account) => account.profile? account.profile.title: null
);

export const selectAccountToken = createSelector(
    selectAccount,
    (account) => account.currentAccount ? account.currentAccount.token : null
);

export const selectAccountHasPhoneRegistered = createSelector(
    selectAccount,
    (account) => !!(account.profile && account.profile.phone_number)
);

export const selectIsLogged = createSelector(
    selectAccount,
    (account) => !!account.currentAccount
);
