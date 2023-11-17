require('../models/model.user');
require('../models/model.replyComment');
const CategoryModel = require('../models/model.category');
const ProductModel = require('../models/model.product');
const CommentModel = require('../models/model.comment');
const BrandModal = require('../models/model.brand');
const { SPECS_KEYS } = require('../../constant');
const { slugify } = require('../../utils/slugify');
const { getS3ResponsenEntity } = require('../../utils/getS3ReponseEntity');
const qs = require('querystring');
class ProductController {
 

  // Admin router
  async adminGetList(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const totalRows = await ProductModel.count();
      const totalPages = Math.ceil(totalRows / limit);

      const products = await ProductModel.find()
        .populate([
          {
            path: 'category',
          },
          {
            path: 'brand',
          },
        ])
        .skip(Number.parseInt(page * limit - limit))
        .limit(Number.parseInt(limit));

      if (products.length > 0) {
        return res.status(200).render('template/product/productList', {
          paginate: {
            totalRows: Number.parseInt(totalRows),
            page: Number.parseInt(page),
            limit: Number.parseInt(limit),
            totalPages: Number.parseInt(totalPages),
          },
          products,
          message: '',
        });
      } else {
        return res.status(400).render('template/product/productList', {
          paginate: { totalRows, page, limit, totalPages },
          products,
          message: 'Không tìm thấy sản phẩm',
        });
      }
    } catch (error) {
      res.status(400).json({ error: 'error' });
    }
  }

}

module.exports = new ProductController();
