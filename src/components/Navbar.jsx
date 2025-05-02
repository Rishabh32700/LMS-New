import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/userStore';
import { logoutUser } from '../services/userService';
import { getUserRole } from '../utils/auth';

import dropdownSvg from '../assets/dropdown.svg';
import docsSvg from '../assets/docs.svg';
import github from '../assets/github.svg';
import settingsSvg from '../assets/Settings.svg';

import { Menu, MenuItem } from '@mui/material';
import styled from 'styled-components';

import logo from '../assets/logo.png'

// Styled Components
const NavbarWrapper = styled.nav`
  height: 84px;
  display: flex;
  align-items: center;
  background-color: rgb(241, 244, 249);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const NavbarContainer = styled.div`
  padding: 0 24px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #006397;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MenuList = styled.ul`
  display: flex;
  list-style: none;
  background: rgb(235, 238, 243);
  border-radius: 50px;
  padding: 8px 20px;
  gap: 20px;
`;

const MenuItemStyled = styled.li`
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 50px;
  font-size: 14px;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;

  &:hover {
    background-color: rgba(0, 99, 151, 0.1);
  }
`;

const Icon = styled.img`
  width: 16px;
  margin-left: 6px;
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconButton = styled.button`
  height: 40px;
  width: 40px;
  border: 1px solid rgba(0, 99, 151, 0.5);
  border-radius: 50%;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0;
`;

const LoginButton = styled.button`
  height: 40px;
  padding: 0 20px;
  background: #006397;
  border: none;
  border-radius: 50px;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const LogoutMenu = styled(Menu)`
  .MuiPaper-root {
    border-radius: 10px;
  }
`;

// Main Navbar Component
const Navbar = () => {
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRole = getUserRole();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLogout = () => {
    logoutUser();
    dispatch(logout());
    navigate('/login');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <NavbarWrapper>
      <NavbarContainer>

        {/* Left: Logo */}
        <Logo>
          <img width={150} height={"50%"} src={logo} alt="logo" /> {/* Removed `loading="lazy"` */}
        </Logo>

        {/* Middle: Navigation Menu */}
        <MenuList>
          <MenuItemStyled>Home</MenuItemStyled>
          <MenuItemStyled>
            Landings
            <Icon src={dropdownSvg} alt="dropdown" />
          </MenuItemStyled>
          <MenuItemStyled>Blocks</MenuItemStyled>
          <MenuItemStyled>Dashboard</MenuItemStyled>
          <MenuItemStyled>
            Pages
            <Icon src={dropdownSvg} alt="dropdown" />
          </MenuItemStyled>
          <MenuItemStyled>
            Docs
            <Icon src={docsSvg} alt="docs" />
          </MenuItemStyled>
        </MenuList>

        {/* Right: Actions */}
        <NavActions>
          <IconButton>
            <img width= "50%" height= "50%" loading="lazy" src={settingsSvg} alt="Settings" />
          </IconButton>

          <IconButton>
            <img width= "50%" height= "50%" loading='lazy' src={github} alt="GitHub" />
          </IconButton>

          {!isAuthenticated ? (
            <LoginButton onClick={() => navigate('/login')}>Login</LoginButton>
          ) : (
            <>
              <LoginButton onClick={handleMenuOpen}>
                {currentUser?.name || 'User'}
              </LoginButton>
              <LogoutMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </LogoutMenu>
            </>
          )}
        </NavActions>

      </NavbarContainer>
    </NavbarWrapper>
  );
};

export default Navbar;
