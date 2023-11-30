import { CartProductType } from "../../product/[productId]/ProductDetails";

interface SetQuantityType {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQuantityIncrease: () => void;
  handleQuantityDecrease: () => void;
}

const SetQuantity: React.FC<SetQuantityType> = ({
  cartCounter,
  cartProduct,
  handleQuantityIncrease,
  handleQuantityDecrease,
}) => {
  return (
    <div className="flex gap-8 items-center">
      {cartCounter ? null : (
        <div className="font-semibold uppercase">quantity: </div>
      )}
      <div className="flex gap-4 items-center text-base">
        <button
          onClick={handleQuantityDecrease}
          className="border-[1.2px] border-slate-300 px-2 rounded"
        >
          -
        </button>
        <div>{cartProduct.quantity}</div>
        <button
          onClick={handleQuantityIncrease}
          className="border-[1.2px] border-slate-300 px-2 rounded"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
