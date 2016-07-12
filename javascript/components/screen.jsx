const React = require('react');

const Screen = React.createClass({

  render() {
    return <div className="screen">
      {this.props.children}
    </div>;
  }
});

module.exports = Screen;
