import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="left-side-inner">
        <h2>Ogólne</h2>
        <NavLink className="menu-left-button" to="/">Lista linków</NavLink>
        {this.props.idLink ?
          <div>
            <NavLink className="menu-left-button" to={`/link/all/days/${this.props.idLink}`}>Lista wejść wszystkich linków</NavLink>
            <NavLink className="menu-left-button" to={`/link/all/times/${this.props.idLink}`}>Lista wejść według pór dnia wszystkich linków</NavLink>
            <h2>Statystyki wybranego linku</h2>
            <NavLink className = "menu-left-button" to={`/link/days/${this.props.idLink}`}>Lista wejść</NavLink>
            <NavLink className="menu-left-button" to={`/link/times/${this.props.idLink}`}>Lista wejść według pór dnia</NavLink>
            <NavLink className="menu-left-button" to={`/link/system/${this.props.idLink}`}>Lista wejść według systemu</NavLink>
            <NavLink className="menu-left-button" to={`/link/browser/${this.props.idLink}`}>Lista wejść według przeglądarki</NavLink>
          </div>
          :
          <div>
            <NavLink className="menu-left-button" to={`/link/all/days`}>Lista wejść wszystkich linków</NavLink>
            <NavLink className="menu-left-button" to={`/link/all/times`}>Lista wejść według pór dnia wszystkich linków</NavLink>
          </div>
        }
      </div>
    );
  }
}

export default NavBar;