import { AuthenticationService } from "../_services";

export function HandleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if ([401, 403].indexOf(response.status) !== -1) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        AuthenticationService.logout();
        window.location.reload(true);
      }

      if (response.status === 400) {
        return Promise.reject('Username or password is incorrect')
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
