import { useState } from "react";
import axios from "axios";

const Compare = () => {
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [data, setData] = useState([]);

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
    try {
      const response = await axios.post(
        "http://localhost:8000/api/photo",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setData(response.data);
      // console.log(URL.createObjectURL(data));
    } catch (error) {
      console.log(error);
    }
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

      <div className="button-div">
        <button className="button-css" onClick={compareApi}>
          Upload
        </button>
      </div>
    </div>
  );
};

export default Compare;
