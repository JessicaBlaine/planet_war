const React = require('react');

const Planet = require('./planet');
const Unit = require('./unit');

const GameMap = React.createClass({
  render() {
    return <div className='map'>
      <div>
        {
          this.props.gameMap.planets.map(planet => {
            return <Planet key={ planet.id } planet={ planet }/>;
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
    </div>;
  }
});

module.exports = GameMap;
