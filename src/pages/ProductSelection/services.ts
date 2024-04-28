import { Http } from "../../services/axios";
import { items } from "../../components/molecules/MultiSelectDropdown/types";

export const submitSelectedProduct = (data: items) =>
  Http.post("/selectedProduct", data);
