import { useState } from "react";
import { Footer, Header } from "../component";
import Help from "../component/layout/header/menu/Help";
import Introduct from "../component/layout/header/menu/Introduct";
import System from "../component/layout/header/menu/System";
import { Categori, Wrapper } from "../styles/styled";

const Menu = () => {
  const [tabs, setTabs] = useState();
  return (
    <>
      <Header setTabs={setTabs} />
      <Categori>
        <Wrapper>
          <Introduct />
        </Wrapper>
      </Categori>
      <Footer />
    </>
  );
};

export default Menu;
