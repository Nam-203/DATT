import { ContentList, Footer, Header } from "../component";
import { Navbar } from "../component/layout/header/navbar";
import { Categori, Wrapper } from "../styles/styled";

const ContentListPage = (props) => {
  return (
    <>
      <Header />
      <Categori>
        <Navbar />
        <Wrapper>
          <main className="main-global-wrap">
            <ContentList />
          </main>
        </Wrapper>
      </Categori>
      <Footer />
    </>
  );
};

export default ContentListPage;
