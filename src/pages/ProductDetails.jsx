import { useParams } from "react-router-dom"
import axiosInstance from "../Axios/axiosinstance";
import { useQuery } from "react-query";
import FurnitureDetails from "../components/furnitureDetails";


const ProductDetails = () => {
  const{id}=useParams();
  const { data: product, error, isLoading } = useQuery(
    {
      queryKey:"products",
      "queryFn":  async () => {
        const response = await axiosInstance.get(`/products/${id}`);
        console.log(response.data)
        return response.data;
      }
    }
    );

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>An error occurred: {error.message}</div>}
      {!error && !isLoading && (
        // <div className='row'>
          
        //    <Card key={products.id} product={products} />;
          
        // </div>
      <div>
          
          <FurnitureDetails product={product}/>
      </div>

      )}
    </>
  )
}

export default ProductDetails