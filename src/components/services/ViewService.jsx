import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import ServiceCard from "../../Cards/ServiceCard";

function ViewService() {
  

 

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      {/* <ServiceCard services={services} error={error} /> */}
      <h1>view all services</h1>
    </div>
  );
}

export default ViewService;
