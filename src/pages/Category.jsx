import * as React from 'react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import axios from 'axios';
import { GridRowModes, DataGridPro, GridToolbarContainer, GridActionsCellItem } from '@mui/x-data-grid-pro';
import { Card, Container, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CategoryDialog from '../sections/Category/CategoryDialog';
import CategoryEditForm from '../sections/Category/CategoryEditForm';
import { APIHttp } from '../helper/API';

export default function Category() {
  const [rows, setRows] = useState([]);
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
      title: 'Do you want to Delete?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      console.log(row.id)
      if (result.isConfirmed) {
        axios.delete(`${APIHttp}/category/delete/${row.row._id}`).then((res) => {
          setRows(rows.filter((rowd) => rowd.id !== row.id));
          if (res.data.isSuccess === true) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: res.data.message,
              showConfirmButton: false,
              timer: 2500
            })
          } else {
            Swal.fire({
              n: 'error',
              title: 'Oops...',
              text: res.data.message,
              timer: 2500
            })
          }
        });
      }
    });
  };

  const columns = [
    { field: 'category', headerName: 'category', width: 200 },

    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: (row, key) => {
        return [
          <GridActionsCellItem icon={<EditIcon />} key={key} label="Edit" onClick={handleEditClick(row)} color="inherit" />,
          <GridActionsCellItem icon={<DeleteForeverIcon />} key={key} label="Delete" onClick={handleDeleteClick(row)} color="inherit" />
        ];
      },
    },
  ];

  useEffect(() => {
    axios.get(`${APIHttp}/category/getAll`).then((r) => {
      const d = r.data.data.map((value, index) => {
        value.id = index + 1;
        return value;
      });
      setRows(d);
      console.log(r.data.data);
    });
  }, [edit]);

  return (
    <>
      <Container className="mt-4">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1} mt={3}>
          <Typography variant="h4" gutterBottom>
            Category
          </Typography>
          <CategoryDialog changeEdit={setEdit} />
        </Stack>
        {/* ==================(edit popop)======================================== */}

        <Dialog
          open={open}
          onClose={handleEditClose}
          fullWidth
          maxWidth="sm"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Update Category'}</DialogTitle>
          <DialogContent>
            <CategoryEditForm changeEdit={setEdit} handleEditClose={handleEditClose} editrow={editRow} />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="secondary" onClick={handleEditClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        {/* ==================================================================== */}

        <Card
          style={{ height: 340, width: '45%', backgroundColor: '#ffffff' }}
          sx={{ boxShadow: 3, borderRadius: '16px' }}
        >
          <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[10]} checkboxSelection />
        </Card>
      </Container>
    </>
  );
}
