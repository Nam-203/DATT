<<<<<<< HEAD
const productRouter = require('./api/router.product');
const categoryRouter = require('./api/router.category');
const commentRouter = require('./api/router.comment');
const userRouter = require('./api/router.user');
const adminRootRouter = require('./admin/router.admin');
const adminProductRouter = require('./admin/route.product');
const orderRouter = require('./api/router.order');
const orderAdminRouter = require('./admin/router.order');
const adminCategoryRouter = require('./admin/route.category');
const adminBrandRouter = require('./admin/route.brand');
const userManagerRouter = require('./admin/router.user');
const visualizeRouter = require('./admin/router.visualize');
const adminCommentRouter = require('./admin/route.comment.js');
const adminAuth = require('../middlewares/adminAuth');
=======
const productRouter = require('./api/router.product.js');
const categoryRouter = require('./api/router.category.js');
const commentRouter = require('./api/router.comment.js');
const userRouter = require('./api/router.user.js');
const adminRootRouter = require('./admin/router.admin.js');
const adminProductRouter = require('./admin/route.product.js');
const orderRouter = require('./api/router.order.js');
const orderAdminRouter = require('./admin/router.order.js');
const adminCategoryRouter = require('./admin/route.category.js');
const adminBrandRouter = require('./admin/route.brand.js');
const userManagerRouter = require('./admin/router.user.js');
const visualizeRouter = require('./admin/router.visualize.js');
const adminCommentRouter = require('./admin/route.comment.js');
const adminAuth = require('../../../../../Downloads/Duanbe_CODEGOC/Duanbe_CODEGOC/middlewares/adminAuth.js');
>>>>>>> 21a9291ca4077a9d96c81bef9b48de1de1048f24

const initialApp = (app) => {
  // *** Site Route ***
  // User route
  app.use('/api/auth', userRouter); //register - login - update user FE
  // Product route
  app.use('/api', productRouter);
  // Category route
  app.use('/api/category', categoryRouter);
  // Comment route
  app.use('/api/comment', commentRouter);
  //order route
  app.use('/api/order', orderRouter);

  // *** Admin Route ***
  app.use('/', adminRootRouter);

  // Dashboard Product
  app.use('/product-manager', adminAuth, adminProductRouter);

  // Dashboard category
  app.use('/category-manager', adminAuth, adminCategoryRouter);

  // Dashboard brand
  app.use('/brand-manager', adminAuth, adminBrandRouter);

  // User management
  app.use('/user-manager', adminAuth, userManagerRouter);

  // Visualize
  app.use('/visualize', adminAuth, visualizeRouter);
  //comment
  app.use('/comment-manager', adminAuth, adminCommentRouter);
  // Dashboard Order
  app.use('/order', adminAuth, orderAdminRouter);
};

module.exports = { init: initialApp };
