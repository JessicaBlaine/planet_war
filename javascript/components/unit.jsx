const React = require('react');

const Unit = React.createClass({
  componentDidMount() {
    // if (this.props.unit.id === 3) {
    //   this.props.unit.changeVelocity(1, 0);
    // }
  },
  render() {
    let radius = this.props.unit.radius;
    let style = {
      transform: `rotate(${this.props.unit.angle}deg)`,
      padding: radius,
      borderRadius: radius,
      left: (this.props.unit.xPos - radius) + "px",
      bottom: (this.props.unit.yPos - radius) + "px"
    };
    return <div className={ "unit " + this.props.unit.owner } style={ style }/>;
  }
});

module.exports = Unit;
