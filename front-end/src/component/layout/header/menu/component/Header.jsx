import { Link } from "react-router-dom";

export const Header = ({ content, title }) => (
  <div>
    <div style={{ display: "flex", justifyItems: "center", gap: "10px" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        width="20px"
      >
        <Link to="/">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          />
        </Link>
      </svg>
      <p style={{ fontWeight: "bold" }}>{content}</p>
    </div>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p
        style={{
          fontWeight: "bold",
          fontSize: "25px",
        }}
      >
        {title}
      </p>
    </div>
  </div>
);
