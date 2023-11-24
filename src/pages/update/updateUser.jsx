import "./update.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { user, userInputs } from "../../formSource";
import { Navigate, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import axios from "axios";

const UpdateUser = ({ inputs }) => {
    const { userId } = useParams();
    const [file, setFile] = useState("");
    const [info, SetInfo] = useState({});
    const navigate = useNavigate();
    const handleChange = e => {
        SetInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    console.log(userId);
    const handleClick = async e => {
        e.preventDefault()
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "upload")
        try {
            const newUser = {
                ...info,
            };
            await axios.put(`/users/update/${userId}`, newUser);
            navigate("/users")

        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Update User</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={
                                file
                                    ? URL.createObjectURL(file[0])
                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <form>
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    multiple
                                    onChange={(e) => setFile(e.target.files)}
                                    style={{ display: "none" }}
                                />
                            </div>

                            {inputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input onChange={handleChange} type={input.type} placeholder={input.placeholder} id={input.id} />
                                </div>
                            ))}
                            <button onClick={handleClick}>Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateUser;
