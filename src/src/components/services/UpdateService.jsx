import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUpdateServiceMutation } from "../../api/serviceApi";

export default function UpdateService({ service, onClose }) {
  const [formData, setFormData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [updateService, { isLoading }] = useUpdateServiceMutation();

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Prevent background scrolling
    return () => {
      document.body.style.overflow = "auto"; // Re-enable background scrolling on close
    };
  }, []);

  useEffect(() => {
    if (service) {
      setFormData({
        serviceId: service.serviceId,
        serviceName: service.serviceName || "",
        description: service.description || "",
        category: service.category || "",
        price: service.price || "",
        expectedDuration: service.expectedDuration || "",
        status: service.status || false,
        imageUrl: service.imageUrl || null,
      });

      if (service.imageUrl) {
        setImagePreview(`http://localhost:8080/api/services/image/${service.imageUrl}`);
      }
    }
  }, [service]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imageUrl: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const validation = () => {
    let newErrors = {};
    if (!formData.description) newErrors.description = "Please fill description";
    if (!formData.price) newErrors.price = "Please fill price";
    if (!formData.expectedDuration) newErrors.expectedDuration = "Please fill expected duration";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validation()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const serviceDtoBlob = new Blob(
      [JSON.stringify({
        serviceId: formData.serviceId,
        serviceName: formData.serviceName,
        description: formData.description,
        category: formData.category,
        price: formData.price,
        expectedDuration: formData.expectedDuration,
        status: formData.status
      })],
      { type: "application/json" }
    );

    const formDataToSend = new FormData();
    formDataToSend.append("ServicesUpdateDto", serviceDtoBlob);
    if (formData.imageUrl instanceof File) {
      formDataToSend.append("imageFile", formData.imageUrl);
    }

    try {
      await updateService(formDataToSend).unwrap();
      toast.success("Service updated successfully!");
      onClose(); // Close modal after success
    } catch (err) {
      toast.error(err?.data?.message || "Failed to update service.");
    }
  };

  return (
    <div className="fixed inset-0  bacKdrop-blur-md bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg overflow-y-auto max-h-[90vh] relative">
        <button className="absolute top-2 right-2 text-gray-600 hover:text-red-600" onClick={onClose}>✖</button>
        <h2 className="text-xl font-semibold mb-4 text-center">Edit Service</h2>

        {!formData ? (
          <p className="text-center">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            {/* Service Name (Read-Only) */}
            <div>
              <label className="block font-medium">Service Name</label>
              <input
                type="text"
                name="serviceName"
                value={formData.serviceName}
                className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
                readOnly
              />
            </div>

            {/* Category (Read-Only) */}
            <div>
              <label className="block font-medium">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
                readOnly
              />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="block font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Expected Duration */}
            <div>
              <label className="block font-medium">Duration (min)</label>
              <input
                type="number"
                name="expectedDuration"
                value={formData.expectedDuration}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>

            {/* Availability */}
            <div className="col-span-2 flex items-center gap-2">
              <label className="font-medium">Available</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>

            {/* Image Upload */}
            <div className="col-span-2">
              <label className="block font-medium">Service Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded border" />
              )}
            </div>

            {/* Submit Button */}
            <div className="col-span-2">
              <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition">
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

UpdateService.propTypes = {
  service: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
