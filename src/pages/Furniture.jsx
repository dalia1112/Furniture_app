import  { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, setSelectedCategoryItems } from "../rtk/Slices/categoriesSlice";
import Card from "../components/card";


const Furniture = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.items);
  const status = useSelector((state) => state.categories.status);
  const selectedCategoryItems = useSelector(
    (state) => state.categories.selectedCategoryItems
  );

  useEffect(() => {
    // Fetch categories
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (categories.length > 0) {
      dispatch(setSelectedCategoryItems(categories[0].items));
    }
  }, [categories, dispatch]);

  const handleCategoryClick = (category) => {
  
    dispatch(setSelectedCategoryItems(category.items));
  };

  if (status === "loading") return <div>Loading categories...</div>;
  if (status === "failed") return <div>Error loading categories.</div>;

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Categories Section (Left Side) */}
        <div className="col-md-2">
          <h4 className="mb-4">Categories</h4>
          <ul className="list-group">
            {categories.map((category) => (
              <li
                key={category.id}
                className={`list-group-item category-item ${
                  selectedCategoryItems === category.items ? "text-danger" : ""
                }`}
                onClick={() => handleCategoryClick(category)}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Cards Section (Right Side) */}
        <div className="col-md-10">
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