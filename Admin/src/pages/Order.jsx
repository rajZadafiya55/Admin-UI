import * as React from 'react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import { Card, Container, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function Order() {
  const [rows, setRows] = useState([]);
  const [edit, setEdit] = useState(-1);

  const handleDeleteClick = (row) => () => {
    Swal.fire({
      title: 'Do you want to Delete?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      console.log(row.id)
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/api/order/delete/${row.row._id}`).then((res) => {
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
    { field: 'username', headerName: 'UserName', width: 130 },
    { field: 'table_no', headerName: 'table_No', width: 110 },
    { field: 'discount', headerName: 'Discount', width: 120 },
    { field: 'total_amt', headerName: 'total Amount', width: 150 },
    { field: 'qty', headerName: 'Qty', width: 260 },
    { field: 'descreption', headerName: 'Descreption', width: 150 },

    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: (row,key) => {
        return [
          <GridActionsCellItem icon={<DeleteForeverIcon />} key={key} label="Delete" onClick={handleDeleteClick(row)} color="inherit" />,
        ];
      },
    },
  ];

  useEffect(() => {
    axios.get('http://localhost:5000/api/order/getAll').then((r) => {
      const d = r.data.data.map((value, index) => {
        value.id = index + 1;
        return value;
      });
      setRows(d);
      console.log(r);
    });
  }, [edit]);

  return (
    <div >
      <Container >
        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={3} mb={1}>
          <Typography variant="h4"  gutterBottom>
            Order 
          </Typography>
        </Stack>
        <Card
          style={{ height: 480, width: '100%', backgroundColor: '#ffffff' }}
          sx={{ boxShadow: 3, borderRadius: '16px' }}
        >
          <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[10]} checkboxSelection />
        </Card>
      </Container>
    </div>
  );
}
