import { AuthenticationService } from "../_services";

export function AuthHeader() {
  // return authorization header with jwt token
  const currentUser = AuthenticationService.currentUserValue;
  if (currentUser && currentUser.jwt) {
    return { Authorization: `Bearer ${currentUser.jwt}` };
  } else {
    return {};
  }
}
