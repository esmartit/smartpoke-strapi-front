import jwtService from "../../_spservices/_spauthentication/jwt.service";

export function ConfigureBackend() {
    let realFetch = window.fetch;
    let user = {};
    window.fetch = function (url, opts) {
      const isLoggedIn =
        opts.headers["Authorization"] === "Bearer fake-jwt-token";
  
        jwtService.getJWT(opts.body)
        .then((response) => {
          user = response.data;
        })
        .catch((error) => {
          user = '';
        });
  
        return new Promise((resolve, reject) => {
        // wrap in timeout to simulate server api call
        setTimeout(() => {
          // authenticate - public
          if (url.endsWith("/api/auth/local") && opts.method === "POST") {
            if (!user) return error("Username or password is incorrect");
            return ok({
              id: user.id,
              username: user.username,
              email: user.email,
              token: user.jwt,
              });
          }

          // get users - secure
          if (url.endsWith("/users") && opts.method === "GET") {
            if (!isLoggedIn) return unauthorised();
            return ok(user);
          }
  
          // pass through any requests not handled above
          if (!user) return error("Username or password is incorrect");
          realFetch(url, opts).then((response) => resolve(response));
  
          // private helper functions
  
          function ok(body) {
            resolve({
              ok: true,
              text: () => Promise.resolve(JSON.stringify(body)),
            });
          }
  
          function unauthorised() {
            resolve({
              status: 401,
              text: () =>
                Promise.resolve(JSON.stringify({ message: "Unauthorised" })),
            });
          }
  
          function error(message) {
            resolve({
              status: 400,
              text: () => Promise.resolve(JSON.stringify({ message })),
            });
          }
        }, 500);
      });
    };
  }
  