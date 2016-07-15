const React = require('react');

const ProgressBar = React.createClass({
  render() {
    const greenStyle = { flex: this.props.units.playerOne };
    const neutralStyle = { flex: this.props.units.neutral };
    const redStyle = { flex: this.props.units.playerTwo };
    return <div className='progress-bar'>
      <span className="playerOne" style={ greenStyle }/>
      <span className="neutral" style={ neutralStyle }/>
      <span className="playerTwo" style={ redStyle }/>
    </div>;
  }
});

module.exports = ProgressBar;
