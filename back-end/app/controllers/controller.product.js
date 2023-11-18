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
  async adminGetAdd(req, res) {
    const category = await CategoryModel.find();
    const brand = await BrandModal.find();

    res
      .status(200)
      .render('template/product/productAdd', { message: '', category, brand });
  }
  async adminAddNew(req, res) {
    let {
      category,
      brand,
      discount,
      flashsale,
      flashsale_end_date,
      name,
      slug,
      specs,
      content,
      price_option,
      color_option,
      amount,
    } = req.body;

    if (!slug) {
      slug = slugify(name);
    }
    if (flashsale === 'on') {
      flashsale = true;
    } else {
      flashsale = false;
    }

    const option = price_option.reduce((prev, _, index, arr) => {
      if (index % 2 === 0 || index === 0) {
        if (!(arr[index] || arr[index + 1])) {
          return prev;
        }
        const newObj = {
          price: parseInt(arr[index].split(',').join('')),
          value: arr[index + 1],
        };
        return [...prev, newObj];
      }
      return prev;
    }, []);

    const color = color_option.reduce((prev, curr) => {
      if (curr) {
        return [...prev, { name: curr }];
      }
      return prev;
    }, []);

    const specification = specs.reduce((prev, curr, index, arr) => {
      return [...prev, [SPECS_KEYS[index], curr]];
    }, []);
    const thumbnail = getS3ResponsenEntity({ ...req.files['thumbnail'][0] });
    const banner_image = getS3ResponsenEntity({ ...req.files['banner'][0] });
    const product_image = req.files['product-image'].map((entity) =>
      getS3ResponsenEntity(entity)
    );

    const product = new ProductModel({
      name,
      option,
      color,
      discount,
      flash_sale: flashsale,
      flashsale_end_date: Date.now(),
      thumbnail,
      product_image,
      banner_image,
      specification,
      article: content,
      slug,
      amount,
      category,
      brand,
    });

    const categoryData = await CategoryModel.find();
    const brandData = await BrandModal.find();

    try {
      await ProductModel.create(product);
      return res.status(200).render('template/product/productAdd', {
        message: 'Thêm sản phẩm thành công',
        category: categoryData,
        brand: brandData,
      });
    } catch (error) {
      return res.status(505).render('template/product/productAdd', {
        message: 'Thêm sản phẩm thất bại',
        category: categoryData,
        brand: brandData,
      });
    }
  }
  async adminDeleteOne(req, res) {
    const { id } = req.params;
    try {
      await ProductModel.deleteOne({ _id: id });
      res.redirect('/product-manager/list');
    } catch (error) {
      res.redirect('/product-manager/list');
    }
  }
  async adminGetUpdate(req, res) {
    const { id } = req.query;
    if (!id) {
      return res.redirect('/product-manager/list');
    }
    try {
      const product = await ProductModel.findById(id).populate([
        { path: 'category' },
        { path: 'brand' },
      ]);
      console.log(
        '🚀 ~ file: controller.product.js ~ line 216 ~ ProductController ~ adminGetUpdate ~ product',
        product
      );
      const brand = await BrandModal.find();
      const category = await CategoryModel.find();
      res.status(200).render('template/product/productEdit', {
        message: '',
        product,
        brand,
        category,
      });
    } catch (error) {
      res.status(300).redirect('product-manager/list');
    }
  }
  async adminPutUpdate(req, res) {
    let {
      category,
      brand,
      discount,
      flashsale,
      name,
      slug,
      specs,
      content,
      price_option,
      color_option,
      amount,
    } = req.body;
    const { id } = req.params;
    console.log(
      '🚀 ~ file: controller.product.js ~ line 274 ~ ProductController ~ adminPutUpdate ~ id',
      id
    );
    if (flashsale === 'on') {
      flashsale = true;
    } else {
      flashsale = false;
    }
    const option = price_option.reduce((prev, _, index, arr) => {
      if (index % 2 === 0 || index === 0) {
        if (!(arr[index] || arr[index + 1])) {
          return prev;
        }
        const newObj = {
          price: parseInt(arr[index].replace(/\./g, '')),
          value: arr[index + 1],
        };
        return [...prev, newObj];
      }
      return prev;
    }, []);

    const color = color_option.reduce((prev, curr) => {
      if (curr) {
        return [...prev, { name: curr }];
      }
      return prev;
    }, []);

    const specification = specs.reduce((prev, curr, index, arr) => {
      return [...prev, [SPECS_KEYS[index], curr]];
    }, []);
    const product = {
      name,
      discount,
      flash_sale: flashsale,
      article: content,
      slug,
      amount,
      category,
      brand,
      option,
      color,
      specification,
    };
    try {
      await ProductModel.updateOne({ _id: id }, product);
      res.status(200).redirect('/product-manager/list?page=1&limit=10');
    } catch (error) {
      res.status(200).redirect('/product-manager/list?page=1&limit=10');
    }
  }

  async searchProduct(req, res) {
    try {
      const keyword = req.query.keyword;
      const products = await ProductModel.find({
        $or: [
          { name: { $regex: keyword, $options: 'i' } }, // Tìm theo tên sản phẩm (không phân biệt hoa thường)
          { description: { $regex: keyword, $options: 'i' } }, // Tìm theo mô tả sản phẩm (không phân biệt hoa thường)
        ],
      });
      req.json(products);
    } catch (error) {
      res.status(400).json({ message: 'khong tim thay san pham' });
    }
  }
}

module.exports = new ProductController();
