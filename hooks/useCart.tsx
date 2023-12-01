import { createContext, useState, useContext } from "react";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { useCallback, useEffect } from "react";
import { toast } from "react-hot-toast";

type CartContextType = {
  cartTotalQty: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleIncreaseQuantity: (product: CartProductType) => void;
  handleDecreaseQuantity: (product: CartProductType) => void;
};

interface Props {
  [propName: string]: any;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );

  useEffect(() => {
    const cartItems: any = localStorage.getItem("cartItem");
    const CProduct: CartProductType[] | null = JSON.parse(cartItems);
    setCartProducts(CProduct);
  }, []);

  const handleAddProductToCart = useCallback((product: CartProductType) => {
    setCartProducts((prev) => {
      let updatedCart;
      if (prev) {
        updatedCart = [...prev, product];
      } else {
        updatedCart = [product];
      }
      toast.success("Product added to cart");
      localStorage.setItem("cartItem", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }, []);

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filteredProduct = cartProducts.filter(
          (item) => item.id !== product.id
        );

        setCartProducts(filteredProduct);
        toast.success("Product removed");
        localStorage.setItem("cartItem", JSON.stringify(filteredProduct));
      }
    },
    [cartProducts]
  );

  const handleIncreaseQuantity = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.quantity == 99) {
        return toast.error("Oops! Maximum reached");
      }

      if (cartProducts) {
        updatedCart = [...cartProducts];
        const existingIndex = cartProducts.findIndex(
          (item) => item.id == product.id
        );

        console.log("existing", existingIndex);
        if (existingIndex > -1) {
          console.log("existinghelo", existingIndex);
          updatedCart[existingIndex].quantity = ++updatedCart[existingIndex]
            .quantity;
        }

        setCartProducts(updatedCart);
        localStorage.setItem("cartItem", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const handleDecreaseQuantity = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.quantity == 1) {
        return toast.error("Oops! Minimum reached");
      }

      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex((item) => {
          return item.id === product.id;
        });

        if (existingIndex > -1) {
          updatedCart[existingIndex].quantity = --updatedCart[existingIndex]
            .quantity;
        }

        setCartProducts(updatedCart);
        localStorage.setItem("cartItem", JSON.stringify(updatedCart));
      }
    },
    [cartProducts]
  );

  const value = {
    cartTotalQty,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  };

  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context == null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }

  return context;
};
