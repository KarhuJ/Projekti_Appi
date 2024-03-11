import { useContext } from "react";
import { AppContext } from "./ContextProvider";

export default function myUseContext() {
  return useContext(AppContext);
}
