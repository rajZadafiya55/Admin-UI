import {
  Button,
  CircularProgress,
  FormControlLabel,
  Grid,
  Input,
  Radio,
  RadioGroup,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from "axios";
import Swal from "sweetalert2";
import "../../styles/header.css";
import { APIHttp } from "../../helper/API";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const MenuForm = (props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setdata] = useState({
    name: "",
    price: "",
    category: "",
    imagename: "",
  });

  const resetData = {
    name: "",
    price: "",
    category: "",
    imagename: "",
  };

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== data.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [data.password]);

  const handleChange = (e) => {
    e.persist();
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const fileChange = (e) => {
    setdata({ ...data, imagename: e.target.files[0] });
  };

  // =========================================================================
  const [rows, setRows] = useState([]);
  const [edit, setEdit] = useState(-1);

  useEffect(() => {
    axios.get(`${APIHttp}/category/getAll`).then((res) => {
      const data = res.data.data.map((value, index) => {
        value.id = index + 1;
        return value;
      });
      setRows(data);
      console.log(data);
    });
  }, [edit]);

  const getData = () => {
    axios.get(`${APIHttp}/item/getAll`).then((res) => {
      const data = res.data.data.map((value, index) => {
        value.id = index + 1;
        return value;
      });
      setdata(data);
      console.log("data", data);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  // =========================================================================
  const handleSubmit = async (e) => {
    console.log(data);
    e.preventDefault();
    setLoading(true);
    // --------------------------API----------------------------
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("imagename", data.imagename);

    try {
      const cloudinaryResponse = await uploadToCloudinary(data.imagename);
      const imageUrl = cloudinaryResponse.secure_url;
      console.log("imageUrl", imageUrl);

      await axios.post(`${APIHttp}/item/add`, formData).then((res) => {
        if (res.data.isSuccess === true) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 2500,
          });
          getData();
          setLoading(false);
          setdata({ ...resetData, imagename: imageUrl });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: res.data.message,
            timer: 2500,
          });
        }
        console.log("data add successfully.");
      });
    } catch (error) {
      console.error("Error:", error);
    }
    setdata({ ...resetData, imagename: " " });
    setOpen(props.handleClose);
  };

  const uploadToCloudinary = async (file) => {
    console.log("file", file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "restaurant_menu");
    formData.append("cloud_name", "dsrk7genk");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dsrk7genk/image/upload",
        formData
      );
      return response.data;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };
  return (
    <div>
      <ValidatorForm
        onSubmit={handleSubmit}
        onError={() => null}
        autocomplete="off"
      >
        <Grid container spacing={8}>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="name"
              id="standard-basic"
              value={data.name || ""}
              onChange={handleChange}
              errorMessages={["Name is required"]}
              label="name "
              validators={["required"]}
            />
            <TextField
              type="number"
              name="price"
              id="standard-basic"
              value={data.price || ""}
              onChange={handleChange}
              errorMessages={["Price is required"]}
              label="price "
              validators={["required"]}
            />

            <TextField
              select
              value={data.category || ""}
              variant="filled"
              onChange={handleChange}
              name="category"
              SelectProps={{
                native: "true",
              }}
            >
              {rows.map((val, index) => {
                return (
                  <>
                    <option>{val.category}</option>
                  </>
                );
              })}
            </TextField>
            <Input
              type="file"
              name="imagename"
              id="standard-basic"
              className="mb-4"
              onChange={fileChange}
              errorMessages={["this field is required"]}
              validators={["required"]}
              accept="image/*"
            />
            {data.imagename && (
              <img
                src={data.imagename}
                alt="item image"
                style={{ maxWidth: "200px" }}
              />
            )}
          </Grid>
        </Grid>

        <div className="container mt-2">
          <div className="row">
            <div className="col-sm-6 ">
              <Button
                color="error"
                variant="contained"
                type="submit"
                className="mb-5"
                fullWidth
                onClick={() => {
                  setdata("");
                }}
              >
                <span> Clear</span>
                <DeleteIcon />
              </Button>
            </div>
            <div className="col-sm-6 mb-2">
              <Button
                color="primary"
                variant="contained"
                type="submit"
                fullWidth
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : (
                  <>
                    <SendIcon /> Add Item
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </ValidatorForm>
    </div>
  );
};

export default MenuForm;
