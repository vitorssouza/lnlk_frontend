import React, { useState } from "react";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavItem,
  NavLink
} from "reactstrap";

import { Link } from "react-router-dom";

const TopBar = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar expand="md">
        <NavbarBrand href="/">
          <img src="/images/logo-white.png" alt="" width="30%" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <NavItem active>
          <NavLink tag={Link} to={"/home"}>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/departments"}>
            Departamentos
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/employees"}>
            Funcionários
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/movements"}>
            Movimentações
          </NavLink>
        </NavItem>
      </Navbar>
    </div>
  );
};

export default TopBar;
