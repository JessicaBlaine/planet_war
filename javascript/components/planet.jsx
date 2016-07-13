const React = require('react');

const Planet = React.createClass({

  render() {
    const radius = this.props.planet.radius;
    let style = {
      width: radius * 2,
      height: radius * 2,
      borderRadius: radius,
      left: (this.props.planet.xPos - radius) + "px",
      bottom: (this.props.planet.yPos - radius) + "px"
    };
    return <div className={"planet " + this.props.planet.owner} style={style}>
      {this.props.planet.friendlyUnits}
    </div>;
  }
});

module.exports = Planet;
