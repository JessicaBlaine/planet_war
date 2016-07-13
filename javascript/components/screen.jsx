const React = require('react');

const GameMap = require('./game_map');

const Screen = React.createClass({
  getInitialState: function() {
    return {
      gameMap: this.props.game.gameMap
    };
  },
  componentDidMount() {
    this.props.game.run(this);
  },
  render() {
    return <div className="screen">
      <GameMap gameMap={ this.state.gameMap }/>
    </div>;
  }
});

module.exports = Screen;
