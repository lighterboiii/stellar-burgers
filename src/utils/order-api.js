import { BURGER_API_URL } from "../constants/constants";
import { checkRes } from "./burger-api";

function setOrder() {
  return fetch(`${BURGER_API_URL}/orders`)
    .then(checkRes)
}

export { setOrder }