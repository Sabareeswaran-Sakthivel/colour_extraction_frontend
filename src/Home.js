import { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [data, setData] = useState();
  const onUploadChange = async (e) => {
    setImage(e.target.files[0]);
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
  };

  const hitApi = async () => {
    const formData = new FormData();
      formData.append("image", image);
      console.log(image);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/pantones",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setData(response.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mt-5 text-center">
        <div className="mb-1">
          <h3>Upload Image here to get the pantone colour codes</h3>
        </div>
        <input
          type="file"
          name="file"
          onChange={(e) => onUploadChange(e)}
          className="p-inputtext p-inputtext-sm w-full"
          accept=".png,.jpeg,.jpg,.svg"
          style={{ backgroundColor: "beige" }}
        />
      </div>
      <div className="button-div">
        <button className="button-css" onClick={hitApi}>
          Upload
        </button>
      </div>
      <div className="mt-2">
        {selectedImage && (
          <div>
            <div className="mt-3 text-center">
              <img
                src={selectedImage}
                alt="No File Uploaded"
                width="250"
                height="300"
                style={{ border: "1px solid gray" }}
              />
            </div>
            <div className="tables">
              <table>
                <tr>
                  <th>Pantone number</th>
                  <th>Hexcode</th>
                  <th>colour</th>
                  <th>C-value</th>
                  <th>Y-value</th>
                  <th>M-value</th>
                  <th>K-value</th>
                  <th>W-value</th>
                </tr>

                {data && data.map((element, index) => {
                  return (
                    <tr key={index}>
                      <td>{element["Pantone Number"]}</td>
                      <td>{element["HEXACODE"]}</td>
                      <td>
                        <div
                          style={{
                            width: "30px",
                            height: "30px",
                            backgroundColor: `#${element["HEXACODE"]}`,
                            margin: "auto",
                          }}
                        ></div>
                      </td>
                      <td>{Math.round(element["C"] * 100)}%</td>
                      <td>{Math.round(element["Y"] * 100)}%</td>
                      <td>{Math.round(element["M"] * 100)}%</td>
                      <td>{Math.round(element["K"] * 100)}%</td>
                      <td>{Math.round(element["W"] * 100)}%</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
