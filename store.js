import { atom } from "jotai";

export const snackBarAtom = atom({
  type: "", //success || error,
  open: false,
  message: "",
});
