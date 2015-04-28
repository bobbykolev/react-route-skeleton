var React = require('react');
var Home = require('./components/home.js');
var Login = require('./components/login.js');
var Footer = require('./components/footer.js');
var Router = require('react-router');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render: function () {
    return (
      <div id="wrapper">
        <header>
          <ul>
            <li><Link to="home">Home</Link></li>
            <li><Link to="login">login</Link></li>
          </ul>
          Logged in as Jane
        </header>
        <RouteHandler/>
        <Footer/>
      </div>
    );
  }
});

var routes = (
  <Route name="home" path="/" handler={App}>
    <Route name="login" handler={Login}/>
    <DefaultRoute handler={Home}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.body);
});