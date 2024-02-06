import * as React from "react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import axios from "axios";
import { GridActionsCellItem } from "@mui/x-data-grid-pro";
import {
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import MenuDialog from "../sections/Menu/MenuDialog";
import MenuEditForm from "../sections/Menu/MenuEditForm";

export default function Menu() {
  const [allItems, setAllItems] = useState([]);
  const [edit, setEdit] = useState(-1);
  const [editRow, seteditRew] = useState({});

  // ========================================================
  const [open, setOpen] = React.useState(false);
  const handleEditClick = (id) => () => {
    seteditRew(id);
    setOpen(true);
  };
  const handleEditClose = () => {
    setOpen(false);
  };
  // ========================================================

  const handleDeleteClick = (row) => () => {
    Swal.fire({
      title: "Do you want to Delete?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/api/item/delete/${row.row._id}`)
          .then((r) => {
            setAllItems(allItems.filter((rowd) => rowd.id !== row.id));
          });
      }
    });
  };

  const columns = [
    { field: "name", headerName: "Name", width: 180 },
    {
      field: "imagename",
      headerName: "Image",
      width: 200,
      renderCell: (params) => (
        <img
          src={params.row.imagename}
          alt="item image"
          style={{ maxWidth: "100%", height: "100%", objectFit: "cover" }}
        />
      ),
    },
    { field: "price", headerName: "Price", width: 150 },
    { field: "category", headerName: "category", width: 200 },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (row) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(row)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteForeverIcon />}
            label="Delete"
            onClick={handleDeleteClick(row)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  useEffect(() => {
    axios.get("http://localhost:5000/api/item/getAll").then((res) => {
      const data = res.data.data.map((value, index) => {
        value.id = index + 1;
        return value;
      });
      setAllItems(data);
    });
  }, [edit]);

  return (
    <div className="mt-2">
      <Container>
        <Stack
          direction="row"
          mt={3}
          alignItems="center"
          justifyContent="space-between"
          mb={1}
        >
          <Typography variant="h4" gutterBottom>
            Menu
          </Typography>
          <MenuDialog changeEdit={setEdit} />
        </Stack>
        {/* ==================(edit popup)======================================== */}

        <Dialog
          open={open}
          onClose={handleEditClose}
          fullWidth
          maxWidth="sm"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Update Item"}</DialogTitle>

          {/* ================================================================================================ */}
          <DialogContent>
            <MenuEditForm
              changeEdit={setEdit}
              handleEditClose={handleEditClose}
              editrow={editRow}
            />
          </DialogContent>
          {/* ================================================================================================ */}

          <DialogActions>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleEditClose}
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>

        <Card
          style={{ height: 480, width: "85%", backgroundColor: "#ffffff" }}
          sx={{ boxShadow: 3, borderRadius: "16px" }}
        >
          <DataGrid
            rows={allItems}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[10]}
            checkboxSelection
          />
        </Card>
      </Container>
    </div>
  );
}
