const React = require('react');

const GameMap = require('./game_map');

const Game = require('../planet_war/game');

const Screen = React.createClass({
  getInitialState: function() {
    return {
      gameMap: this.props.game.gameMap,
      modal: ""
    };
  },
  componentDidMount() {
    this.props.game.run(this);
  },
  gameOver(contentString) {
    this.setState({
      modal: <div className="modal">
        <div className="content">
          <span>{contentString}</span>
          <button onClick={ this.resetGame }>Play again?</button>
        </div>
      </div>
    });
  },
  resetGame() {
    const game = new Game;
    this.setState({
      gameMap: game.gameMap, modal: ""
    }, game.run(this));
  },
  render() {
    return <div className="screen">
      <GameMap gameMap={ this.state.gameMap }/>
      {this.state.modal}
    </div>;
  }
});

module.exports = Screen;
