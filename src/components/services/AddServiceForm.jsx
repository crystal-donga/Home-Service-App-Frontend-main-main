import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import { useCreateServiceMutation } from "../../api/serviceApi";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"; // ✅ react-cookie

const categories = {
  Plumbing: [
    "Pipe Repair",
    "Leak Fixing",
    "Drain Cleaning",
    "Faucet Installation",
    "Water Heater Repair",
    "Sewer Line Inspection",
  ],
  Electrical: [
    "Wiring Installation",
    "Circuit Breaker Repair",
    "Ceiling Fan Installation",
    "Home Automation Setup",
    "Electrical Panel Upgrade",
  ],
  Carpentry: [
    "Custom Furniture Making",
    "Cabinet Installation",
    "Door & Window Repair",
    "Wood Floor Installation",
    "Deck & Patio Construction",
  ],
  Cleaning: [
    "House Cleaning",
    "Office Cleaning",
    "Carpet Cleaning",
    "Window Washing",
    "Deep Cleaning Services",
  ],
  Painting: [
    "Interior Painting",
    "Exterior Painting",
    "Wallpaper Installation",
    "Spray Painting",
    "Furniture Refinishing",
  ],
  Caretaking: [
    "Elderly Care",
    "Child Care",
    "Pet Sitting",
    "House Sitting",
    "Gardening & Lawn Maintenance",
  ],
  HVAC: [
    "AC Repair & Maintenance",
    "Heating System Installation",
    "Duct Cleaning",
    "Air Quality Inspection",
  ],
  "Home Security": [
    "CCTV Installation",
    "Smart Lock Setup",
    "Alarm System Installation",
    "Security Consultation",
  ],
  "Pest Control": [
    "Termite Treatment",
    "Mosquito Control",
    "Rodent Removal",
    "Bed Bug Extermination",
  ],
  "Automobile Services": [
    "Car Repair",
    "Tire Replacement",
    "Battery Jump Start",
    "Car Washing & Detailing",
  ],
};

export default function AddServiceForm() {
  const [cookies] = useCookies(["authToken"]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [imagePreview, setImagePreview] = useState();
  const [errors, setErrors] = useState({});
  const [createService] = useCreateServiceMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    serviceProvider: "",
    description: "",
    price: "",
    serviceName: "",
    category: "",
    expectedDuration: "",
    status: true,
    image_url: null,
  });

  useEffect(() => {
    const token = cookies.authToken;
    if (token) {
      const decoded = jwtDecode(token);
      setFormData((prevData) => ({
        ...prevData,
        serviceProvider: decoded.serviceProviderId,
      }));
    }
  }, [cookies]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image_url: file });

      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const validation = () => {
    let newErrors = {};
    if (!formData.description) newErrors.description = "please fill description";
    if (!formData.price) newErrors.price = "please fill price";
    if (!formData.expectedDuration) newErrors.expectedDuration = "please fill expected duration";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validation()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const serviceDetailsBlob = new Blob(
      [
        JSON.stringify({
          serviceProvider: formData.serviceProvider,
          category: selectedCategory,
          serviceName: selectedService,
          description: formData.description,
          price: formData.price,
          expectedDuration: formData.expectedDuration,
          status: formData.status,
        }),
      ],
      { type: "application/json" }
    );

    const formDataToSend = new FormData();
    formDataToSend.append("ServicesRegisterDto", serviceDetailsBlob);
    if (formData.image_url) {
      formDataToSend.append("imageFile", formData.image_url);
    } else {
      console.warn("No image selected");
    }

    try {
      await createService(formDataToSend).unwrap();
      toast.success("Service created successfully");
      navigate("/view-services");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to submit user details.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-4 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Add New Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Category Dropdown */}
        <div>
          <label className="block text-gray-700 font-medium">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedService("");
            }}
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Category</option>
            {Object.keys(categories).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Service Dropdown */}
        {selectedCategory && (
          <div>
            <label className="block text-gray-700 font-medium">
              Service Name
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Service</option>
              {categories[selectedCategory].map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Expected Duration */}
        <div>
          <label className="block text-gray-700 font-medium">
            Expected Duration (in minutes)
          </label>
          <input
            type="number"
            name="expectedDuration"
            value={formData.expectedDuration}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-gray-700 font-medium">Available</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-medium">
            Service Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.image_url && (
            <p className="text-red-500 text-sm">{errors.image_url}</p>
          )}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Service Preview"
              className="mt-2 w-32 h-32 rounded object-cover border"
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
