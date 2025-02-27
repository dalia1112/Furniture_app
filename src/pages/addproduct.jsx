import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../rtk/Slices/categoriesSlice";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm();
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload_product_data");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dd53yaq43/image/upload",
        formData
      );
      setImageUrl(response.data.secure_url);
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const onSubmit = (data) => {
    if (imageUrl) {
      data.image = imageUrl;
    } else {
      toast.error("Please upload an image for the product.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const newProduct = {
      ...data,
      id: Date.now(), 
      categoryId: Number(data.category), 
    };

    console.log("New product data:", newProduct); 
    dispatch(addProduct({ categoryId: Number(data.category), product: newProduct }));

    reset();
    setImageUrl("");
    toast.success("Product added successfully!", {
      position: "top-center",
      autoClose: 3000,
    });
  };

  return (
    <div className="container w-75 m-auto p-5">
      <ToastContainer /> 
      <div className="card shadow-lg p-5">
        <h3 className="text-center mb-4" style={{ color: "#725c42" }}>
          Add New Product
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label fw-bold">Product Name</label>
            <input {...register("title", { required: true })} className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Product Image</label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => uploadImage(e.target.files[0])}
            />
            {imageUrl && <img src={imageUrl} alt="Preview" className="mt-2 img-thumbnail" width="150" />}
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Price</label>
            <input type="number" {...register("price", { required: true })} className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Category</label>
            <select {...register("category", { required: true })} className="form-select">
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
          
          <button
            type="submit"
            className="btn w-100"
            style={{ backgroundColor: "#725c42", color: "white" }}
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;