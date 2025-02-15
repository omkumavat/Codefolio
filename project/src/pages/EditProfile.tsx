import React, { useEffect, useRef, useState } from 'react';
import { User, Pencil } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BasicInfo from '../components/EditSections/BasicInfo';
import Account from '../components/EditSections/Account';
import { useAuth } from '../Context/AuthProvider';
import axios from 'axios';

const menuItems = [
  { id: 'basic-info', label: 'Basic Info', icon: User },
  { id: 'account', label: 'Account', icon: User },
  { id: 'privacy', label: 'Privacy', icon: User },
  { id: 'billing', label: 'Billing', icon: User },
  { id: 'notifications', label: 'Notifications', icon: User }
];

function EditProfile() {
  const { currentUser, updateProfile } = useAuth();
  const [activeSection, setActiveSection] = useState('basic-info');
  const [editMode, setEditMode] = useState(null);

  // State to handle profile picture preview and file
  const [profilePicturePreview, setProfilePicturePreview] = useState(
    currentUser?.profilePicture
  );
  const [profilePictureFile, setProfilePictureFile] = useState(null);

  // Reference for the hidden file input
  const fileInputRef = useRef(null);

  // Trigger file chooser when pencil is clicked
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePictureFile(file);
      const previewUrl = URL.createObjectURL(file);
      setProfilePicturePreview(previewUrl);
    }
  };

  const fetchUpdatedUser = async () => {
    // setloading(true);
    try {
      if (!currentUser?._id) {
        console.log("No valid user ID found");
        return;
      }
  
      const response = await axios.get(`http://localhost:4000/server/user/get-user/${currentUser._id}`);
      if (response.status === 200 && response.data?.data) {
        await updateProfile(response.data.data);
      } else {
        console.log("Invalid response received");
      }
    } catch (error) {
      console.error("Unable to fetch user", error);
    } finally {
      // setloading(false); // Always reset loading state
    }
  };
  // Function to convert file to Base64 and then save it on the server
  const handleSaveProfilePic = async () => {
    if (!profilePictureFile) return;
    
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64data = reader.result; // this is a data URI string (e.g., "data:image/png;base64,...")
      try {
        const id=currentUser._id;
        console.log(base64data)
        const response = await axios.put(
          `http://localhost:4000/server/user/edituser/${id}`,
          { imageData: base64data },
        );
        if (response.data.success) {
          fetchUpdatedUser();
          setProfilePictureFile(null)
        }
      } catch (error) {
        console.error('Error saving profile picture', error);
      }
    };
    reader.readAsDataURL(profilePictureFile);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen mt-20 bg-gray-50">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 bg-white shadow-lg p-6 mb-6 lg:mb-0">
            <div className="border-b pb-4">
              <div className="relative w-24 h-24 mx-auto mb-4">
                <img
                  src={profilePicturePreview || currentUser.profilePicture}
                  alt="Profile"
                  className="rounded-full w-full h-full object-cover"
                />
                <button
                  className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow hover:bg-gray-50"
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                >
                  <Pencil size={16} />
                </button>
                {/* Hidden file input */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
              </div>
              {/* Show Save Image button if a new file has been selected */}
              {profilePictureFile && (
                <div className="text-center mb-2">
                  <button
                    onClick={handleSaveProfilePic}
                    className="text-sky-500 font-medium"
                  >
                    Save Image
                  </button>
                </div>
              )}
              <p className="text-gray-500 text-sm text-center">
                {currentUser?.username}
              </p>
            </div>
            <div className="mt-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setEditMode(null);
                  }}
                  className={`w-full px-6 py-3 flex items-center space-x-3 hover:bg-gray-50 ${
                    activeSection === item.id ? 'text-sky-500 bg-sky-50' : 'text-gray-700'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 px-4 lg:px-8">
            <div className="max-w-3xl mx-auto py-8">
              {activeSection === 'basic-info' && (
                <BasicInfo
                  editMode={editMode}
                  handleInputChange={() => {}}
                  setEditMode={setEditMode}
                  handleSave={() => {}}
                />
              )}
              {activeSection === 'account' && <Account />}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EditProfile;
