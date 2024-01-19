import "./App.css";
import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

function App() {
  const [addSection, setAddSection] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    image: null,
  });

  const [dataList, setDataList] = useState([]);

  const handleOnChange = (e) => {
    const { value, name, type } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: e.target.files[0], // Assuming you only allow selecting one file
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObject = new FormData();
    formDataObject.append("name", formData.name);
    formDataObject.append("email", formData.email);
    formDataObject.append("phone", formData.phone);
    formDataObject.append("image", formData.image);

    try {
      const response = await axios.post("/user/create", formDataObject);
      console.log(response.data);

      if (response.data.success) {
        setAddSection(false);
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  // ===============GETTING DATA============

  const getFetchData = async () => {
    const response = await axios.get("/");
    console.log(response.data);
    if (response.data.success) {
      setDataList(response.data);
      alert(response.data.message);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);
  
 
  console.log(dataList);


  return (
    <>
      <div className="container">
        <button className="btn" onClick={() => setAddSection(true)}>
          Add Contact
        </button>

        {addSection && (
          <div className="addContainer">
            <form onSubmit={handleSubmit}>
              <div className="close-btn" onClick={() => setAddSection(false)}>
                <MdClose />
              </div>
              <label htmlFor="name">name :</label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleOnChange}
              />

              <label htmlFor="email">email :</label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={handleOnChange}
              />

              <label htmlFor="phone">phone :</label>
              <input
                type="text"
                id="phone"
                name="phone"
                onChange={handleOnChange}
              />

              <input type="file" name="image" onChange={handleOnChange} />

              <button>submit</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
