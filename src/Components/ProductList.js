import React from "react";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
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
