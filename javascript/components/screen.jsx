const React = require('react');

const GameMap = require('./game_map');

const Game = require('../planet_war/game');

const Screen = React.createClass({
  getInitialState: function() {
    const game = new Game;
    return {
      game: game,
      gameMap: game.gameMap,
      modal: <div className="modal">
        <div className="content">
          <span>How to Play</span>
          <img src="http://res.cloudinary.com/nevermorte/image/upload/v1468794923/PlanetWar_instructions.png"/>
          <button onClick={ this.startGame }>Start</button>
        </div>
      </div>
    };
  },
  startGame() {
    this.setState({ modal: "" }, () => this.state.game.run(this));
  },
  componentDidMount() {
    // this.state.game.run(this);
  },
  gameOver(contentString) {
    this.setState({
      modal: <div className="modal">
        <div className="content">
          <span>{contentString}</span>
          <button onClick={ this.resetGame }>Play again</button>
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
