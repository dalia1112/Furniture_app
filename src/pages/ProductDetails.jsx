

import { useParams } from "react-router-dom";
import axiosInstance from "../Axios/axiosinstance";
import { useQuery } from "react-query";
import FurnitureDetails from "../components/furnitureDetails";

const ProductDetails = () => {
  const { id } = useParams();

  const {
    data: categories,
    error: categoriesError,
    isLoading: categoriesLoading,
  } = useQuery("categories", async () => {
    const response = await axiosInstance.get("/categories");
    return response.data;
  });


  const product = categories
    ?.flatMap((category) => category.items)
    .find((item) => item.id === parseInt(id)); 

  return (
    <>
      {categoriesLoading && <div>Loading...</div>}
      {categoriesError && <div>An error occurred: {categoriesError.message}</div>}
      {!categoriesLoading && !categoriesError && (
        <div>
          {product ? (
            <FurnitureDetails product={product} />
          ) : (
            <div>Product not found.</div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductDetails;