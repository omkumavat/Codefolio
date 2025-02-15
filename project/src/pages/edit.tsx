import React, { useState, useEffect } from "react";
import Button from "../components/Button.js";
import TextBox from "../components/TextBox.js";
import { EnvelopeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const EditProfile = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedEmail = localStorage.getItem("email");
        if (!storedEmail) {
          alert("Email is required");
          return;
        }

        const response = await axios.get(`http://localhost:5000/user/getuserbyemail`, {
          params: { email: storedEmail },
        });

        setId(response.data.user._id);
        setName(response.data.user.name);
        setEmail(response.data.user.email);
        setPassword(response.data.user.password);
        setConfirmPassword(response.data.user.password);
      } catch (error) {
        alert(error?.response?.data?.message);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      name,
      email,
      password,
    };

    try {
      const response = await axios.put(`http://localhost:5000/user/update/${id}`, userData);
      alert(response?.data?.message);
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  };

  return (
    <div className="px-80 mt-10">
      {/* <div className="flex flex-row justify-center items-center">
        <h2>Change Profile Picture:</h2>
        <div className="w-20 mt-4 ml-5">
          <Button name="Update" />
        </div>
      </div> */}

      <div className="flex flex-col justify-center items-center mt-10">
        <p className="font-sans text-gray-400 text-lg text-center font-semibold tracking-widest mb-10">
          Update Your Information
        </p>
        <form className="flex flex-col gap-4 mr-10 ml-4" onSubmit={handleUpdate}>
          <TextBox label="Name" type="text" Icon={UserIcon} value={name} setValue={setName} required={true} />

          <TextBox
            label="Email"
            type="text"
            Icon={EnvelopeIcon}
            value={email}
            setValue={setEmail}
            required={true}
          />

          <TextBox
            label="Password"
            type="password"
            Icon={LockClosedIcon}
            value={password}
            setValue={setPassword}
            required={true}
          />

          <TextBox
            label="Confirm Password"
            type="password"
            Icon={LockClosedIcon}
            value={confirmPassword}
            setValue={setConfirmPassword}
            required={true}
          />

          <Button type="submit" name="Update" onClick={undefined} />
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
