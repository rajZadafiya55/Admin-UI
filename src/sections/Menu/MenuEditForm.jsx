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
import { APIHttp } from '../../helper/API';

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const MenuEditForm = (props) => {
  const [loading, setLoading] = useState(false);
  console.log(props.editrow.row);
  const [open, setOpen] = useState(false);
  const [data, setdata] = useState({
    name: "",
    price: "",
    category: "",
    imagename: "",
  });
  console.log("update_data", data);
  const resetData = () => ({
    name: "",
    price: "",
    category: "",
    imagename: "",
  });

  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== data.password) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule("isPasswordMatch");
  }, [data.password]);

  // =========================================================================
  const [rows, setRows] = useState([]);
  const [edit, setEdit] = useState(-1);

  useEffect(() => {
    axios
      .get(`${APIHttp}/category/getAll`)
      .then((r) => {
        const d = r.data.data.map((value, index) => {
          value.id = index + 1;
          return value;
        });
        setRows(d);
        console.log(d);
      });
  }, [edit]);

  // ==========Edit=================
  useEffect(() => {
    setdata({ ...props.editrow.row });
  }, [props.editrow.row]);
  // ==========Edit=================

  const handleChange = (e) => {
    e.persist();
    setdata({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const fileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setdata({ ...data, imagename: selectedFile });
    } else {
      console.error("No file selected");
    }
  };

  // ==============(PUT API)=============================================================================

  const handleSubmit = async (e, _id) => {
    e.preventDefault();
    setLoading(true);
    console.log("data", data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("imagename", data.imagename);

    console.log(data._id);

    try {
      const cloudinaryResponse = await uploadToCloudinary(data.imagename);
      const imageUrl = cloudinaryResponse.secure_url;
      console.log("imageUrl", imageUrl);

      await axios
        .patch(`${APIHttp}/item/edit/${data._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log("Edit success:", res.data.data);
          props.changeEdit(res.data._id);
          setOpen(props.handleEditClose);
          setdata(resetData());
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error editing item:", error);
        });
    } catch (error) {
      console.log(error);
    }
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
              errorMessages={["this field is required"]}
              label="name "
              validators={["required"]}
            />
            <TextField
              type="number"
              name="price"
              id="standard-basic"
              value={data.price || ""}
              onChange={handleChange}
              errorMessages={["this field is required"]}
              label="price "
              validators={["required"]}
            />

            <TextField
              label="category"
              select
              value={data.category || ""}
              variant="filled"
              onChange={handleChange}
              name="category"
              SelectProps={{
                native: "true",
              }}
            >
              {rows.map((val) => (
                <option key={val.id}>{val.category}</option>
              ))}
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
                style={{ maxWidth: "200px", marginBottom: "10px" }}
              />
            )}
            {/* <img src={`../../.././UI/public/photos/${data.imagename}`} alt="" /> */}
            {/* <img src={data.imagename instanceof File ? URL.createObjectURL(data.imagename) : data.imagename} alt="" /> */}
          </Grid>
        </Grid>

        <div className="container">
          <div className="row">
            <div className="col-sm-6 mb-2">
              <Button
                color="error"
                variant="contained"
                type="submit"
                fullWidth
                onClick={() => {
                  setdata(resetData());
                }}
              >
                <DeleteIcon />
                <span> Clear</span>
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
                    <SendIcon /> Edit Item
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

export default MenuEditForm;
