import { Cart, Footer, Header } from "../component";
import { Navbar } from "../component/layout/header/navbar";
import { Categori, Wrapper } from "../styles/styled";

const CartPage = () => {
  return (
    <>
      <Header />
      <Categori>
        <Navbar />
        <Wrapper>
          <main className="main-global-wrap">
            <Cart />
          </main>
        </Wrapper>
      </Categori>

      <Footer />
    </>
  );
};

export default CartPage;
