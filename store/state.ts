import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAddressList:any = create()(
  persist(
    (set, get) => ({
      addressList: [],
      setAddressList: (val: any) => {
        set({
          addressList: val,
        });
      },
      clearAddressList: () => {
        set({
          addressList: []
        });
      },
    }),
    {
      name: "addressStore",
    }
  )
);


export const loginAccountState:any = create()(
  persist(
    (set, get) => ({
      loginAccount: '',
      setLoginAccount: (val: any) => {
        set({
          loginAccount: val,
        });
      },
      clearAccount: () => {
        set({
          loginAccount: ''
        });
      },
    }),
    {
      name: "loginAccountStore",
    }
  )
);
