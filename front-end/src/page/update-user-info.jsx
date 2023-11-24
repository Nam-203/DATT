import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Footer, Header } from "../component";
import { Navbar } from "../component/layout/header/navbar";
import UserInfo from "../component/user-info";
import { getUserDecode } from "../redux/authSlice";
import { Categori, Wrapper } from "../styles/styled";

const UpdateUserInfoPage = () => {
  const userInfo = useSelector(getUserDecode);
  const history = useHistory();

  if (userInfo === null) {
    history.push("/login");
    return null;
  }

  return (
    <>
      <Header />
      <Categori>
        <Navbar />
        <Wrapper>
          <main className="userinfo-wrap">
            <UserInfo data={userInfo} />
          </main>
        </Wrapper>
      </Categori>
      <Footer />
    </>
  );
};

export default UpdateUserInfoPage;
