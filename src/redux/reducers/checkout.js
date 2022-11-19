/* eslint-disable import/no-anonymous-default-export */
import { message } from "antd";

const initialState = {
  carts: [],
  shipping: {
    ownerType: "citizen",
    firstName: undefined,
    lastName: undefined,
    companyName: undefined,
    companyRegister: undefined,
    phone: undefined,
    tel: undefined,
    email: undefined,
    province: undefined,
    district: undefined,
    quarter: undefined,
    place: undefined,
    address: undefined,
  },
  payment: {
    method: "bank_account",
  },
};

const addCart = (state, payload) => {
  const mapped = state.carts.reduce(
    (accumulator, iterator) => ({
      ...accumulator,
      [iterator.product]: iterator,
    }),
    {}
  );

  if (!mapped[payload.product]) {
    mapped[payload.product] = {
      product: payload.product,
      title: payload.title,
      image: payload.image,
      qty: payload.qty || 1,
      stock: payload.quantity,
      price: payload.sale ? payload.sale.price : payload.price,
      oldPrice: payload.sale && payload.price,
    };
    message.success("Таны сагсанд 1 бараа нэмэгдлээ!");
  } else if (mapped[payload.product].qty + 1 <= mapped[payload.product].stock) {
    if (payload.qty > 0) {
      message.success("Таны сагсанд 1 бараа нэмэгдлээ!");
    } else {
      message.warning("Таны сагснаас 1 бараа хасагдлаа!");
    }
    mapped[payload.product].qty += payload.qty;
  } else {
    message.error("Уучлаарай барааны үлдэгдэл хүрэлцэхгүй байна!");
  }

  return Object.values(mapped).map((cart) => cart);
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "cart/add": {
      return {
        ...state,
        carts: addCart(state, action.payload),
      };
    }
    case "cart/remove": {
      console.log(state.carts, action.payload);
      return {
        ...state,
        carts: state.carts.filter((cart) => cart.product !== action.payload),
      };
    }
    case "cart/clear": {
      return {
        ...state,
        carts: [],
      };
    }
    case "shipping/update": {
      return {
        ...state,
        shipping: action.payload,
      };
    }
    case "payment/update": {
      return {
        ...state,
        payment: action.payload,
      };
    }
    case "shipping/additional": {
      return {
        ...state,
        shipping: {
          ...state.shipping,
          additional: action.payload,
        },
      };
    }
    default:
      return state;
  }
};
