import React, { useState } from "react";
import "./index.scss";
import Block from "./Block";
import { useSelector } from "react-redux";

const Elements = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const { recipes } = useSelector((s) => s);

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const displayedProducts = recipes.slice(start, end);
  const totalPages = Math.ceil(recipes.length / itemsPerPage);
  let res = [];
  for (let i = 1; i <= totalPages; i++) {
    res.push(i);
  }
  return (
    <div id="elements">
      <div className="container">
        <div className="elements">
          <h1 className="elements--texts" data-aos="fade-right">Популярные продукты</h1>
          <div className="elements--title">
            {displayedProducts.map((el, idx) => (
              <Block el={el} idx={idx} />
            ))}
          </div>
          <div className="pagination">
            <button
              style={{
                cursor: currentPage === 1 ? "" : "pointer",
                background: currentPage === 1 ? "#dad7d7" : "",
                color: currentPage === 1 ? "#fff" : "",
              }}
              onClick={() => {
                setCurrentPage(currentPage - (currentPage === 1 ? 0 : 1));
                window.scroll(900, 900);
              }}
            >
              {"<"}
            </button>
            {res.map((el, idx) => (
              <span
                onClick={() => {
                  setCurrentPage(idx + 1);
                  window.scroll(900, 900);
                }}
                style={{
                  background: el !== currentPage ? "" : "#29AAE3",
                  color: el !== currentPage ? "" : "white",
                }}
                key={idx}
              >
                {el}
              </span>
            ))}
            <button
              style={{
                cursor: currentPage === totalPages ? "" : "pointer",
                background: currentPage === totalPages ? "#dad7d7" : "",
                color: currentPage === totalPages ? "#fff" : "",
              }}
              onClick={() => {
                setCurrentPage(
                  currentPage + (currentPage === totalPages ? 0 : 1)
                );
                window.scroll(900, 900);
              }}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Elements;
