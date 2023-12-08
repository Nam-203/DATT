import { Footer, Header } from "../component";
import { Navbar } from "../component/layout/header/navbar";
import { Categori } from "../styles/styled";

const ErrorPage = () => {
  return (
    <>
      <Header />
      <Categori>
        <Navbar />
        <main className="main-global-wrap"></main>
      </Categori>

      <Footer />
    </>
  );
};

export default ErrorPage;
