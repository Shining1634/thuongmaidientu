const express = require("express");
// import { createProduct, deleteProduct, getDetailSP, getProducts, getProductToCategoryNoiBat, getProductToCategorySPLienQuan, importProductsFromExcel, updateProduct } from '../controllers/Product/product.controller';
// import { uploadExcel, uploadExcelFile } from '../controllers/Upload/upload.controller';
const { createProduct, deleteProduct, getDetailSP, getProducts, getProductToCategoryNoiBat, getProductToCategorySPLienQuan, importProductsFromExcel, updateProduct, deleteNhieuProduct, timSPCanCheckSoLuongTon } = require('../controllers/Product/product.controller');

const router = express.Router();

// find all product
router.get("/get-product", getProducts );

// tao moi product
router.post("/create-product", createProduct );

// update product
router.put("/update-product", updateProduct );

// delete product
router.delete("/delete-product/:id", deleteProduct );

router.delete("/delete-nhieu-product", deleteNhieuProduct );



// tìm sản phẩm thông qua idloaisp và bán trên 10 sp
router.get("/get-product-idloaisp-noibat", getProductToCategoryNoiBat );

router.get("/get-product-idloaisp-lien-quan", getProductToCategorySPLienQuan );

router.get("/get-detail-product", getDetailSP );

router.get("/get-detail-product-check", timSPCanCheckSoLuongTon );


module.exports = router;