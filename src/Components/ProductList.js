import React from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

export default function ProductList(props) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Manufacturer</TableCell>
            <TableCell>Mark</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.products.map((elem) => {
            return (
              <TableRow key={elem.product_id}>
                <TableCell>{elem.name}</TableCell>
                <TableCell>{elem.category_name}</TableCell>
                <TableCell>{elem.manufacturer}</TableCell>
                <TableCell>{elem.mark}</TableCell>
                <TableCell>{elem.year}</TableCell>
                <TableCell>{elem.quantity}</TableCell>
                <TableCell>{elem.price}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() =>
                      props.openProductUpdate(elem.product_id, elem.category_id)
                    }
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() =>
                      props.openDeleteConfirmation(
                        elem.product_id,
                        elem.inventory_id
                      )
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
