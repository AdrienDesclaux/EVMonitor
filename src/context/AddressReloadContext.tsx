import { Dispatch, SetStateAction, createContext } from 'react';

type tAddressAdd = {
  addressIsAdded: boolean | undefined;
  setAddressIsAdded: Dispatch<SetStateAction<boolean>>;
};
type tAddressDelete = {
  addressIsDeleted: boolean | undefined;
  setAddressIsDeleted: Dispatch<SetStateAction<boolean>>;
};
export const addressIsDeletedContext = createContext<tAddressDelete>({
  addressIsDeleted: false,
  setAddressIsDeleted: () => undefined
});

export const addressIsAddedContext = createContext<tAddressAdd>({
  addressIsAdded: false,
  setAddressIsAdded: () => undefined
});
