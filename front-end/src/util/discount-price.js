import { formatCurrency } from '.';

export const discountPrice = (price, discount = []) =>
  price && formatCurrency(price - ( price * (discount / 100)));
