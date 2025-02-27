import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategoryItems } from "../rtk/Slices/categoriesSlice";
import Card from "../components/card";;

const Furniture = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);
  const selectedCategoryItems = useSelector((state) => state.categories.selectedCategoryItems);

  useEffect(() => {
    if (categories.length > 0) {
      dispatch(setSelectedCategoryItems(categories[0].items));
    }
  }, [categories, dispatch]);

  const handleCategoryClick = (category) => {
    dispatch(setSelectedCategoryItems(category.items));
  };

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-md-2">
          <h4 className="mb-4">Categories</h4>
          <ul className="list-group">
            {categories.map((category) => (
              <li key={category.id} className="list-group-item category-item" onClick={() => handleCategoryClick(category)}>
                {category.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-10">
          {/* <AddProduct /> */}
          <div className="row">
            {selectedCategoryItems.map((item) => (
              <Card product={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Furniture;