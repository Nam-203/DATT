import { selectCart } from "../../redux/cartSlice"
import { discountPrice } from "../../util"
import { cart } from "../../util/cart"
import { useSelector } from 'react-redux';

export const Total = () => {
    const cartSlice = useSelector(selectCart)

    return (
        <div className="cart-total">
            <p>Tổng giá trị: <strong className="price">{discountPrice(cart.totalPrice(cartSlice))}</strong> </p>
            <p>Giảm giá: <strong className="price">-0 ₫</strong></p>
            <p>Tổng thanh toán: <strong className="price text-red">{discountPrice(cart.totalPrice(cartSlice))}</strong></p>
            <button className="next">Tiếp tục</button>
        </div>
    )
}