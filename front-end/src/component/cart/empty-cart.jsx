import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className='emptycart'>
      <p className='emptycart-text'>Giỏ hàng trống!</p>
      <Link to='/' className='emptycart-link'>
        Về trang chủ
      </Link>
    </div>
  );
};

export default EmptyCart;
