import { Card, CardContent, Grid } from "@mui/material";
import React from "react";

const PaginationItem = ({ item }) => {
  console.log("pd=>", item);
  return (
    <>
      <Card>
        <CardContent>
          <img src={item.image} alt="" width={"200px"} height="250px" />
          <h1>{item.title.slice(0, 25) + "..."}</h1>
        </CardContent>
      </Card>
    </>
  );
};

export default PaginationItem;
