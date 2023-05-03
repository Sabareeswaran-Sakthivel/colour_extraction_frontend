import { useState } from "react";
import axios from "axios";
// import { useFormik } from 'formik';
// import { Button } from 'primereact/button';
// import { Toast } from 'primereact/toast';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RadioButton } from "primereact/radiobutton";

const Compare = () => {
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [data, setData] = useState([]);
  const [result, setResult] = useState(null);

  const categories = [
    { name: "Full Image", key: "F" },
    { name: "Crop the Design", key: "C" },
  ];
  const [selectedCategory, setSelectedCategory] = useState("");

  const onImageChange = async (e) => {
    setImage(e.target.files[0]);
    setBeforeImage(URL.createObjectURL(e.target.files[0]));
  };

  const onAfterImageChange = async (e) => {
    setImage2(e.target.files[0]);
    setAfterImage(URL.createObjectURL(e.target.files[0]));
  };

  const compareApi = async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("image", image2);
    console.log(image);
    console.log(image2);
    getFormErrorMessage(selectedCategory);
    try {
      let url;
      // if (selectedCategory.name == "Full Image") {
      //   url = "http://localhost:8000/api/pantones2";
      // } else {
      //   url = "http://localhost:8000/api/pantones1";
      // }
      url = "http://localhost:8000/v2/image/diff";
      const response = await axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Data", response.data);
      let results = String(response.data.toString()[0]);
      // result = String(response.data.toString()[0]);
      // console.log("Result", result);

      console.log(!!result);
      if (results !== "n") {
        setData(response.data);
      } else {
        setResult(response.data.toString()[0]);
      }
      // console.log(URL.createObjectURL(data));
    } catch (error) {
      console.log(error);
    }
  };

  const isFormFieldInvalid = (name) => {
    console.log(!!name.name);
    return !!name.name;
  };

  const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name)
      ? toast.success("Request Processing")
      : toast.error("Value is required");
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <div
          className="mt-5 text-center"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            type="file"
            name="file"
            onChange={(e) => onImageChange(e)}
            className="p-inputtext p-inputtext-sm w-full"
            accept=".png,.jpeg,.jpg,.svg"
            style={{ backgroundColor: "beige" }}
          />
          {beforeImage && (
            <img
              src={beforeImage}
              alt="No File Uploaded"
              width="250"
              height="300"
              style={{ border: "1px solid gray", marginTop: "0.5rem" }}
            />
          )}
        </div>
        <div
          className="mt-5 text-center"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <input
            type="file"
            name="file"
            onChange={(e) => onAfterImageChange(e)}
            className="p-inputtext p-inputtext-sm w-full"
            accept=".png,.jpeg,.jpg,.svg"
            style={{ backgroundColor: "beige" }}
          />
          {afterImage && (
            <img
              src={afterImage}
              alt="No File Uploaded"
              width="250"
              height="300"
              style={{ border: "1px solid gray", marginTop: "0.5rem" }}
            />
          )}
        </div>
      </div>
      <div
        style={{
          marginTop: "2rem",
          display: "flex",
          width: "100%",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <div className="flex flex-column gap-3">
          {categories.map((category) => {
            return (
              <div key={category.key} className="flex align-items-center">
                <RadioButton
                  inputId={category.key}
                  name="category"
                  value={category}
                  onChange={(e) => setSelectedCategory(e.value)}
                  checked={selectedCategory.key === category.key}
                />
                <label htmlFor={category.key} className="ml-2">
                  {category.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      {/* {getFormErrorMessage(selectedCategory)} */}

      <div className="button-div">
        <button className="button-css" onClick={compareApi}>
          Upload
        </button>
        <ToastContainer />
      </div>
      <div className="mt-5 text-center">
        {data.length > 0 && (
          <div>
            <h2>Output</h2>
            <img
              src={`http://localhost:8000/output.png`}
              alt="output"
              width="250"
              height="300"
            />
          </div>
        )}
      </div>
      <div className="mt-5 text-center">
        {!!result && (
          <div>
            <h2>No difference</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;
