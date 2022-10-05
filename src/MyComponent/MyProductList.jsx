import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MyProdItem from "./MyProdItem";

const MyProductList = () => {
  const [api, setApi] = useState([]);
  const [flt, setFlt] = useState([]);
  const [catData, setCatData] = useState([]);
  const [catName, setCatName] = useState("");
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(4);
  const [pageCount, setPageCount] = useState(0);
  console.log("catName", catName);
  const [srch, setSrch] = useState("");
  const getData = async () => {
    const result = await axios.get("https://fakestoreapi.com/products");
    const categories = await axios.get(
      "https://fakestoreapi.com/products/categories"
    );
    // console.log(categories.data);
    setCatData(categories.data);
    setApi(result.data);
    setFlt(result.data);
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    const filtData = flt.filter((item) =>
      item.title.toUpperCase().includes(srch.toUpperCase())
    );
    setApi(filtData);
  }, [srch]);
  //Gategories filter function
  useEffect(() => {
    const catFilt = flt.filter((item) => item.category == catName);
    setApi(catFilt);
    console.log(catFilt);
  }, [catName]);

  return (
    <>
      {/* <h1>My Product List</h1> */}
      <Grid container spacing={2}>
        <Grid item xs={6} className="textContainer">
          <TextField
            variant="standard"
            fullWidth
            label="search here"
            onChange={(e) => setSrch(e.target.value)}
          />
        </Grid>

        <Grid container spacing={2} xs={12}>
          {catData.map((item) => (
            <Grid item fullWidth xs={3}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => setCatName(item)}
              >
                {" "}
                {item}{" "}
              </Button>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2}>
          {api.map((item) => (
            <>
              <Grid item xs={3}>
                <MyProdItem item={item} />
              </Grid>
            </>
          ))}
        </Grid>
        <Grid item xs={6}>
          {" "}
          <Button variant="contained">Previous</Button>{" "}
        </Grid>
        <Grid item xs={6}>
          {" "}
          <Button variant="contained">Next</Button>{" "}
        </Grid>
      </Grid>
    </>
  );
};

export default MyProductList;
