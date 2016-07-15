const React = require('react');

const Planet = require('./planet');
const Unit = require('./unit');
const ProgressBar = require('./progress_bar');

const GameMap = React.createClass({
  getInitialState: function() {
    return {
      selectedPlanet: undefined
    };
  },
  attackMove(planet) {
    if (this.state.selectedPlanet) {
      this.props.gameMap.attackMove(this.state.selectedPlanet, planet);
      this.setState({ selectedPlanet: undefined });
    }
    else {
      this.setState({ selectedPlanet: planet });
    }

  },
  render() {
    return <div className='map'>
      <div>
        {
          this.props.gameMap.planets.map(planet => {
            let selected = "";
            if (planet === this.state.selectedPlanet) {
              selected = "selected";
            }
            return <Planet handleClick={this.attackMove}
                           key={ planet.id }
                           planet={ planet }
                           selected={ selected }/>;
          })
        }
      </div>
      <div>
        {
          this.props.gameMap.units.map(unit => {
            return <Unit key={ unit.id } unit={ unit }/>;
          })
        }
      </div>
      <ProgressBar units={ this.props.gameMap.unitCounts() }/>
    </div>;
  }
});

module.exports = GameMap;
