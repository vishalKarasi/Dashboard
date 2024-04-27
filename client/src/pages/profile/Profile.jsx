import "./profile.scss";
import React, { useState } from "react";
import { deleteAdmin, updateAdmin } from "@app/services/adminSlice.js";
import {
  FaCheckCircle,
  FaEdit,
  FaEnvelope,
  FaFile,
  FaLock,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "@components/button/Button";
import Input from "@src/components/input/Input";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { admin, status } = useSelector((state) => state.admin);
  const [editMode, setEditMode] = useState(false);

  const handleEdit = (event) => {
    event.preventDefault();
    if (editMode) {
      const credential = new FormData(event.target);
      dispatch(updateAdmin({ id: admin._id, credential }));
      setEditMode(false);
    } else setEditMode(true);
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    if (editMode) setEditMode(false);
    else await dispatch(deleteAdmin(admin._id));
    if (status === "success") navigate("/");
  };

  const INPUTS = [
    {
      label: "Username",
      type: "text",
      name: "name",
      icon: <FaUser />,
      pattern: "^[A-Za-z0-9]{4,16}$",
      errorMessage: "Please enter a valid name",
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      icon: <FaEnvelope />,
      errorMessage: "Please enter a valid email",
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      icon: <FaLock />,
      pattern:
        "^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,32}$",
      errorMessage: "Please enter a valid password",
    },
  ];

  return (
    <main id="profile">
      <div className="profilePic">
        <img src={admin.profilePic} alt="pfp" />
        {editMode && (
          <label htmlFor="edit" className="editPfp">
            <FaFile />
          </label>
        )}
      </div>

      <form
        method="POST"
        encType="multipart/form-data"
        onSubmit={handleEdit}
        className="editForm"
      >
        <input
          type="file"
          name="profilePic"
          id="edit"
          style={{ display: "none" }}
        />

        {editMode ? (
          <>
            {INPUTS.map((input, index) => (
              <Input key={index} {...input} />
            ))}
          </>
        ) : (
          <>
            <div data-label="Name: " className="highlight">
              {admin.name}
            </div>
            <div data-label="Email: " className="highlight">
              {admin.email}
            </div>
          </>
        )}

        <div className="setting">
          <Button
            className="btn-edit"
            label={editMode ? "Confirm" : "Edit"}
            icon={editMode ? <FaCheckCircle /> : <FaEdit />}
          />

          <Button
            className="btn-delete"
            type="button"
            label={editMode ? "Cancel" : "Delete"}
            icon={<FaTrash />}
            onClick={handleDelete}
          />
        </div>
      </form>
    </main>
  );
}

export default Profile;
