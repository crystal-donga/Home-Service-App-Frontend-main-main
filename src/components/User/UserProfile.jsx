// import React from 'react'
// import UserSidebar from './UserSidebar.jsx';

// const UserProfile=()=> {
//     return (
//         <>
//         {/* // < className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//         //   <h1 className="text-2xl font-bold text-gray-800 mb-4">User Profile</h1> */}
//           <UserSidebar />
//         </>
//       );
// }

// export default UserProfile
import  { useState } from 'react';
import UserSidebar from './UserSidebar.jsx';
import UserDetailsForm from './UserDetailsForm.jsx';

const UserProfile = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar - It will collapse instead of disappearing */}
      <UserSidebar isOpen={isSidebarCollapsed} setIsOpen={setIsSidebarCollapsed} />

      {/* Main Content */}
      <div className={`flex-1 p-6 bg-gray-300 min-h-screen transition-all duration-300 ${isSidebarCollapsed ? "ml-50" : "ml-0"}`}>
        {/* <h1 className="text-2xl font-bold text-gray-800 mb-4">User Profile</h1> */}
        {/* <UserDetailsForm onSubmitSuccess={() => setIsSidebarCollapsed(true)} /> */}
      </div>
    </div>
  );
}

export default UserProfile;
