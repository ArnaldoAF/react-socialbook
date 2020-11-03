import React from 'react';
import { Link } from 'react-router-dom';

import "./styles.css";

import addIcon from '../../assets/images/icons/plus-square.svg';
import homeIcon from '../../assets/images/icons/home.svg';
import searchIcon from '../../assets/images/icons/search.svg';

const Menu: React.FC = () => {

    return (
        <div className=" menu">
            <Link to={`/create`}  className="menu-icon">
                <img src={addIcon} alt=""/>
            </Link>
            <Link to={`/home`}  className="menu-icon">
                <img src={homeIcon} alt=""/>
            </Link>
            <Link to={`/search`}  className="menu-icon">
                <img src={searchIcon} alt=""/>
            </Link>
        </div>
    )
}

export default Menu;