import React from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { productsConstants } from "../../constants/tableConstants";
import { useSelector } from "react-redux";

const ProductsTable = () => {
  const { products } = useSelector((state) => state.productSlice);

  // function for reform the product name
  const reformName = (values) => {
    if (values.length <= 20) {
      return values;
    }
    let str = "";
    for (let i = 0; i < 20; i++) {
      str += values[i];
    }
    return str + "...";
  };

  return (
    <TableContainer component={Paper} sx={{ height: "100%" }}>
      <Table aria-label="simple table" size="small">
        <TableHead
          sx={{
            backgroundColor: "#F3F4F6",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <TableRow>
            {productsConstants.map((heading, index) => {
              return (
                <TableCell key={index} style={{ fontWeight: 900 }}>
                  <span className=" flex justify-center items-center gap-1 font-poppins py-1 cursor-pointer">
                    <p>{heading}</p>
                  </span>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => {
            return (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <span className=" flex justify-center items-center font-poppins py-2">
                    {product.id}
                  </span>
                </TableCell>
                <TableCell component="th" scope="row">
                  <span className=" flex justify-center items-center font-poppins py-2">
                    {reformName(product.name)}
                  </span>
                </TableCell>
                <TableCell component="th" scope="row">
                  <span className=" flex justify-center items-center font-poppins py-2">
                    {product.mainCategoryName}
                  </span>
                </TableCell>
                <TableCell component="th" scope="row">
                  <span className=" flex justify-center items-center font-poppins py-2">
                    {product.subCategoryName}
                  </span>
                </TableCell>
                <TableCell component="th" scope="row">
                  <span className=" flex justify-center items-center font-poppins py-2">
                    {product.imageUrls.length}
                  </span>
                </TableCell>
                <TableCell component="th" scope="row">
                  <span className=" flex justify-center items-center font-poppins py-2">
                    {product.mainCategoryId}
                  </span>
                </TableCell>
                <TableCell component="th" scope="row">
                  <span className=" flex justify-center items-center font-poppins py-2">
                    {product.subCategoryId}
                  </span>
                </TableCell>
                <TableCell align="right">
                  <span className=" flex justify-center items-center font-poppins font-bold py-2">
                    <HiOutlineDotsVertical className="text-base cursor-pointer" />
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;
