import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom'


const Datatable = ({ columns }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${path}`)
  const navigate = useNavigate();

  useEffect(() => {
    setList(data)
  }, [data])

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));

    } catch (err) { }
  };


  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300, // Increased width to accommodate two buttons
      renderCell: (params) => {
        console.log(params);
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
            <Link to={`/${path}/${params.row._id}/update`} className="updateButton">
              Update

            </Link>
          </div >
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={100}
        rowsPerPageOptions={[9]}
        rowHeight={100}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
