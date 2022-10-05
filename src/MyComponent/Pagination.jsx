import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Grid } from "@mui/material";
import PaginationItem from "./PaginationItem";

const Pagination = () => {
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(4);
  const [pageCount, setPageCount] = useState(0);
  //   console.log("api", data);

  const getData = async () => {
    const res = await axios.get(`https://fakestoreapi.com/products`);
    const data = [...res.data];
    const slice = data.slice(offset, offset + perPage);

    setData(slice);
    setPageCount(Math.ceil(data.length / perPage));
  };
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage + 1);
  };
  useEffect(() => {
    getData();
  }, [offset]);

  return (
    <>
      {/* <h1>this is Pagination</h1> */}
      <div className="App">
        <Grid container spacing={2}>
          {data.map((item) => (
            <Grid item xs={3} key={item.id}>
              <PaginationItem item={item} />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ReactPaginate
              previousLabel={"prev"}
              nextLabel={"next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Pagination;
