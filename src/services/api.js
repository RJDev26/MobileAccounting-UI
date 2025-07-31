export const AccountAPIUrls = {
  GET_ALL: `/api/AccountMaster/list`,
  CREATE: `/api/AccountMaster/save`,
  UPDATE: `/api/AccountMaster/save`, 
  DELETE: (accountId) => `/api/AccountMaster/${accountId}`,
  GET_ALL_GROUP: `/api/AccountMaster/account-group/list`,
};

export const accountGroupApiUrls = {
  GET_ALL: "/api/AccountMaster/account-group/list",
  CREATE: "/api/AccountMaster/account-group"
}


export const voucherApiUrls = {
  GET_ALL: "/api/Voucher/summary",
  GET_SINGLE: "/api/Voucher/getvoucher-by-id",
  CREATE: "/api/Voucher/save",
  UPDATE: "/api/Voucher/save",
  DELETE: "/api/Voucher/delete",
}

export const ledgerApiUrls = {
  GET_ALL: "/api/Voucher/ledger"
}

export const trialBalanceApiUrls = {
  GET_ALL: "/api/Voucher/trial-balance"
}