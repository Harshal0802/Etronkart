import Container from "../../components/Container";
import ProductDetails from "./ProductDetails";
import { product } from "../../../utils/product";
import ListRating from "./ListRating";

interface IParams {
  productId?: string;
}

const Product = ({ params }: { params: IParams }) => {
  console.log("params", params);
  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="flex flex-col gap-4 mt-20">
          <div>Add Rating</div>
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default Product;
