import { Footer, Header, Home } from "../component";
import { Navbar } from "../component/layout/header/navbar";
import { Categori, Wrapper } from "../styles/styled";

const HomePage = () => {
  return (
    <>
      <Header />
      {/* <Categori>

       
      </Categori> */}
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2">
            <Navbar />
          </div>
          <div className="col-lg-10 col-md-12">
            <Wrapper>
              <Home />
            </Wrapper>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
