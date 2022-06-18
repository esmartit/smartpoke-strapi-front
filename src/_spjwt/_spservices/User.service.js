import { AuthHeader, HandleResponse } from "../_sphelpers";

export const UserService = {
  getAll,
};

function getAll() {
  const requestOptions = { method: "GET", headers: AuthHeader() };
  return fetch(`/api/auth/local`, requestOptions).then(HandleResponse);
}
