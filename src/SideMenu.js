import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SideMenu = () => {
    const [menuItems, setMenuItems] = useState([]);
    useEffect(() => {
        axios
            .get('https://nifty-kare-32d12b.netlify.app/treemenu.json')
            .then((response) => {
                setMenuItems(response.data);
            })
            .catch((error) => {
                console.error('Error fetching menu data:', error);
            });
    }, []);



    const renderMenuItems = (items) => {
        return (
            <ul>
                {items.map((item) => (
                    <li key={item.key} className='list-item'>
                        <div className="header">
                            <input type="checkbox" id={item.key} />
                            <label htmlFor={item.key}>{item.label}</label>
                            <div >
                                {item.nodes && item.nodes.length > 0 && (
                                    <button
                                        className="dropdown-arrow"
                                        onClick={(e) => handleDropdownClick(e)}
                                    >
                                        <img src="down-arrow.png" alt="Dropdown Arrow" />
                                    </button>
                                )}
                            </div>
                        </div>
                        {item.nodes && item.nodes.length > 0 && (
                            <ul className="sub-menu hidden">
                                {renderMenuItems(item.nodes)}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    const handleDropdownClick = (e) => {
        const parentLi = e.target.closest('li');
        const subMenu = parentLi.querySelector('.sub-menu');
        subMenu.classList.toggle('hidden');
    };

    return <div className="side-menu">{renderMenuItems(menuItems)}</div>;
};

export default SideMenu;
