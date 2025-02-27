import { useDispatch, useSelector } from "react-redux";
import Card from "../card";
import { useEffect } from "react";
import { fetchCategories } from "../../rtk/Slices/categoriesSlice";

const Products = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.categories);

  // Get the first category's items
  const firstCategoryItems = items.length > 0 ? items[0].items : [];

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCategories());
    }
  }, [status, dispatch]);

  return (
    <div>
      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div>An error occurred: {error}</div>}
      {status === "succeeded" && (
        <>
          <div className="fs-3 fw-bold m-5">Explore Our Products</div>
          <div className="row">
            {firstCategoryItems.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
