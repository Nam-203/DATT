import { Nav } from "./nav";
import { Info } from "./info";
import "./footer.scss";
import styled from "styled-components";
const Section = styled.div`
  padding: 10px 5px 0px;
`;
export const Footer = () => {
  return (
    <Section className="footer-global-wrap">
      <section className=" footer-wrap">
        <Nav />
        <Info />
      </section>
    </Section>
  );
};
