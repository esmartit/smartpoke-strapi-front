import React from "react";
import indexRoutes from "./_sproutes/";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./redux/Store";
import { History } from "./jwt/_helpers";
import { PrivateRoute } from "./_sproutes/PrivateRoutes";
import BlankLayout from "./_splayouts/BlankLayout";

const App = () => {
  //const [currentUser, SetcurrentUser] = useState(null);
  return (
    <Provider store={configureStore()}>
      <Router history={History}>
        <Switch>
          <Route exact path="/_spauthentication/Login" component={BlankLayout} />;
          {indexRoutes.map((prop, key) => {
            return (
              <PrivateRoute
                path={prop.path}
                key={key}
                component={prop.component}
              />
            );
          })}
        </Switch>
      </Router>
    </Provider>
  );
};
export default App;
