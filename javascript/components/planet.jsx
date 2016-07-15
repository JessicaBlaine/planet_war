const React = require('react');

const Planet = React.createClass({
  getInitialState: function() {
    return {
      selected: undefined
    };
  },
  handleSelect() {
    if (this.state.selected) {
      this.props.attackMove(this.state.selected, this.props.planet);
    }
  },
  render() {
    let radius = this.props.planet.radius;
    let style = {
      width: radius * 2,
      height: radius * 2,
      borderRadius: radius,
      left: (this.props.planet.xPos - radius) + "px",
      bottom: (this.props.planet.yPos - radius) + "px"
    };
    return <div onClick={this.props.handleClick.bind(null, this.props.planet)}
                className={ "planet " + this.props.planet.owner }
                style={ style }>
      {this.props.planet.friendlyUnits}
    </div>;
  }
});

module.exports = Planet;
