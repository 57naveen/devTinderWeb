import React, { useState } from "react";
import UserCards from "./UserCards";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const dispatch = useDispatch()
  const [showToast, setShowToast] = useState(false)

  const saveProfile = async () => {
    setError("")
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true } 
      );

      dispatch(addUser(res?.data?.data))
      setShowToast(true);

      setTimeout(()=>{
        setShowToast(false)
      },3000)

    } catch (error) { 
      setError(error.response.data);
    }
  };

  return (
    <>
     <div className="flex justify-center my-10">
      <div>
        <div className="my-10 flex justify-center mx-10  items-center">
          <div className="card bg-neutral text-neutral-content w-96">
            <div className="card-body items-center text-center">
              <h2 className="card-title">Login</h2>
              <div>
                <legend className="fieldset-legend">First Name</legend>
                <label className="input validator">
                  <input
                    type="text"
                    placeholder=""
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-70"
                  />
                </label>
              </div>
              <div>
                <legend className="fieldset-legend">Last Name</legend>
                <label className="input validator">
                  <input
                    type="text"
                    required
                    placeholder=""
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-70"
                  />
                </label>
              </div>
              <div>
                <legend className="fieldset-legend">Age</legend>
                <label className="input validator">
                  <input
                    type="text"
                    required
                    placeholder=""
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-70"
                  />
                </label>
              </div>
              <div>
                <legend className="fieldset-legend">Gender</legend>
                <label className="input validator">
                  <input
                    type="text"
                    required
                    placeholder=""
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-70"
                  />
                </label>
              </div>
              <div>
                <legend className="fieldset-legend">Photo Url</legend>
                <label className="input validator">
                  <input
                    type="text"
                    required
                    placeholder=""
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    className="w-70"
                  />
                </label>
              </div>
              <div>
                <legend className="fieldset-legend">About</legend>
                <label className="input validator">
                  <input
                    type="text"
                    required
                    placeholder=""
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="w-70"
                  />
                </label>
              </div>
              <p className="text-red-500 m-3">{error}</p>
              <div className="card-actions justify-end mt-2">
                <button className="btn btn-primary" onClick={saveProfile}>Save Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="my-10">
        <UserCards
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
    </div>
    
  {showToast &&  <div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile updated</span>
  </div>
  </div> }
   
    </>
   
  );
};

export default EditProfile;
