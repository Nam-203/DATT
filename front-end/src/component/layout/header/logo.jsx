import { Link } from 'react-router-dom';
import { PublicPath } from '../../../constant';

export const Logo = () => {
  return (
    <section className="header-logo-wrap">
      <div className="header-logo">
        <Link to="/" className="header-logo-link">
          <img
            src={PublicPath + '/static/image/logo-resize.png'}
            alt="Thế giới tech logo"
            className="header-logo-image"
          />
        </Link>
      </div>
    </section>
  );
};
