import { ContentDetail, Footer, Header } from "../component";
import { Navbar } from "../component/layout/header/navbar";
import { Categori, Wrapper } from "../styles/styled";

const ContentDetailPage = () => {
  return (
    <>
      <Header />
      <Categori>
        <Navbar />
        <div className="Wapper">
          <ContentDetail />
        </div>
      </Categori>
      <Footer />
    </>
  );
};

export default ContentDetailPage;
