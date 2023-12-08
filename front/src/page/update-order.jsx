import { Footer, Header } from "../component";
import { Navbar } from "../component/layout/header/navbar";
import { UpdateOrder } from "../component/update-order";
import { Categori, Wrapper } from "../styles/styled";

const UpdateOrderPage = () => {
  return (
    <>
      <Header />
      <Categori>
        <Navbar />
        <Wrapper>
          <main className="main-global-wrap">
            <UpdateOrder />
          </main>
        </Wrapper>
      </Categori>
      <Footer />
    </>
  );
};

export default UpdateOrderPage;
