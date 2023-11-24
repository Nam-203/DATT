import { Footer, Header, Home } from "../component";
import { Navbar } from "../component/layout/header/navbar";
import { Categori, Wrapper } from "../styles/styled";

const HomePage = () => {
  return (
    <>
      <Header />
      <Categori>
        <Navbar />
        <Wrapper>
          <Home />
        </Wrapper>
      </Categori>
      <Footer />
    </>
  );
};

export default HomePage;
