import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Menu.module.scss";
import {
  Navbar,
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const Menu = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={styles.Menu}>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Gestion Academica</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/user/">Usuarios</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Perfil
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Perfil</DropdownItem>
                <DropdownItem>Opciones</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Cerrar sesión</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

Menu.propTypes = {};

Menu.defaultProps = {};

export default Menu;
