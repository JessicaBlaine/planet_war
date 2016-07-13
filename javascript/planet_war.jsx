// React
const React = require("react");
const ReactDom = require("react-dom");
const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;
// components
const Screen = require('./components/screen');
// game logic
const Game = window.Game = require('./planet_war/game');

const GameRouter = (
  <Router history={ hashHistory }>
    <Route path="/" component={ Screen }>

    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById('root');
  ReactDom.render(<Screen game={ new Game }/>, root);
});
