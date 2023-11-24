import { useEffect, useState } from "react";
import styled from "styled-components";
import { query } from "../../../access";
import { NavItem } from "./nav-item";

const NavbarCategori = styled.div`
  width: 200px;
  margin-right: 10px;
  background-color: white;
  border-radius: 15px;
  .category-header {
    font-weight: bold;
    margin-left: 20px;
    padding-top: 10px;
  }
  .category-item {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;
export const Navbar = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await query().category.getAll();
        const { data } = response;
        setData(data);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <NavbarCategori style={{ marginBottom: "20px", marginLeft: "10px" }}>
        <ul class="">
          <div class="category-header">
            <p>Danh mục</p>
          </div>
          <div className="category-item">
            {data.map((record) => (
              <NavItem
                path={`category/${record?.slug}-${record?._id}`}
                name={record.name}
              />
            ))}
          </div>
        </ul>
      </NavbarCategori>
      <NavbarCategori style={{ marginBottom: "20px", marginLeft: "10px" }}>
        <div class="category-header">
          <p>Sản phẩm nổi bật </p>
        </div>
        <div className="category-item">
          {data.map((record) => (
            <NavItem
              path={`category/${record?.slug}-${record?._id}`}
              name={record.name}
            />
          ))}
        </div>
      </NavbarCategori>
    </nav>
  );
};
