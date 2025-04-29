
import  { useState,useEffect } from 'react';
import UserSidebar from './UserSidebar.jsx';
import UserDetailsForm from './UserDetailsForm.jsx';

const UserProfile = () => {
  useEffect(()=>{
    document.title="User Profile"
  },[])
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  return (
    <div className="flex">
      {/* Sidebar - It will collapse instead of disappearing */}
      <UserSidebar isOpen={isSidebarCollapsed} setIsOpen={setIsSidebarCollapsed} />

      {/* Main Content */}
      <div className={`flex-1 p-6 bg-white min-h-screen transition-all duration-300 ${isSidebarCollapsed ? "ml-50" : "ml-0"}`}>
        {/* <h1 className="text-2xl font-bold text-gray-800 mb-4">User Profile</h1> */}
        {/* <UserDetailsForm onSubmitSuccess={() => setIsSidebarCollapsed(true)} /> */}
      </div>
    </div>
  );
}

export default UserProfile;
