import React, { useState } from 'react'
import styled from "styled-components";
import LogoImg from '../images/cripto-logo.png';

import { FaHome, FaWallet, FaBars} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);

  return (
    <Nav>
        <NavContainer>
            <Logo to="/">
                <LogoIcon src={LogoImg} alt="CriptoNita" />
                <span>CriptoNita</span>
            </Logo>
            <Bars onClick={()=> setShowMenu(!showMenu)}/>
            <Menu id={ showMenu ? "menuBar" : "menuNav"}>
                <MenuLink to="/">
                    <FaHome />
                    <span>Inicio</span>
                </MenuLink>
                <MenuLink to="/info">
                    <FaWallet />
                    <span>Ver Criptomonedas</span>
                </MenuLink>
            </Menu>
        </NavContainer>
    </Nav>
  )
}

const Nav = styled.nav`
    background: #0d0712;
    padding: 0.5rem;
`;

const NavContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 80rem;
    margin: 0 auto;
`;

const Logo = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;

    span {
        font-size: 1.25rem;
        font-weight: 600;
        color: #fff;
    }
`;

const LogoIcon = styled.img`
    height: 42px;
    width: 42px;
`;


const Menu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
`

const MenuLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    border-radius: 4px;
    color: #fff;
    text-decoration: none;
    font-size: 1rem;
    padding: 0.25rem 0.5rem;
    cursor: pointer;
    gap: 0.5rem;
    transition: background 0.2s ease-in-out;

    &:hover {
        background: #263044;
        color: #fff;
    }

    svg {
        fill: currentColor;
        font-size: 1rem;
    }
`;

 const Bars = styled(FaBars) `
    display: none;
    color: #fff;

    @media screen and (max-width: 768px) {
        display: block;
        position: relative;
        trasnform: trasnlate(-100%, 75);
        top: 15px;
        right: 15px;
        font-size: 1.8rem;
        cursor: pointer;
    }
 `;

export default Header
