import { Action } from "./action";
import "./header.scss";
import { Logo } from "./logo";
import { Search } from "./search";
import { Navbar } from "./navbar";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Menu = styled.div`
  width: 100%;
`;
export const Header = () => {
  return (
    <Menu>
      <header className="header-global-wrap">
        <div className="header-top-wrap">
          <div className="container header-top">
            <Link to="/introduct" className="header-top-link">
              Giới Thiệu
            </Link>
            <Link to="#" className="header-top-link">
              Hỗ trợ
            </Link>
            <Link to="#" className="header-top-link">
              Hệ thống siêu thị
            </Link>
            <Link to="#" className="header-top-link">
              Tuyển dụng
            </Link>
          </div>
        </div>
        <section className="container header-wrap">
          <Logo />
          <Search />
          <Action />
        </section>
      </header>
    </Menu>
  );
};
