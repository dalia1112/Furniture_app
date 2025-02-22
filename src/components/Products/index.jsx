
import { useDispatch, useSelector } from "react-redux";

import Card from "../card";
import { useEffect } from "react";
import { fetchProducts } from "../../rtk/Slices/productSlice";

const Products = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return (
    <div>
      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div>An error occurred: {error}</div>}
      {status === "succeeded" && (
        <>
        <div className="fs-3 fw-bold m-5"> Explore Our Products</div>
        <div className="row">
          {items?.map((product) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
        </>
      )}
    </div>
  );
};

export default Products;
