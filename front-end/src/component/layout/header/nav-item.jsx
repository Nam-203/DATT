import { NavLink } from "react-router-dom";
import styled from "styled-components";
const NavbarUI = styled.div`
  .name {
    color: black;
    font-size: 14px;
    text-transform: capitalize;
  }
`;
export const NavItem = ({ path, name }) => {
  return (
    <NavbarUI className="nav-item">
      <NavLink exact to={"/" + path} className="nav-item-link">
        <div className="name">{name}</div>
      </NavLink>
    </NavbarUI>
  );
};
