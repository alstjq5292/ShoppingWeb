const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');

//=================================
//            Product
//=================================

var storage = multer.diskStorage({
    destination: function (req, file, cb) { // 파일저장 부분
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
   
  var upload = multer({ storage: storage }).single("file")

router.post('/image', (req, res) => {

    // 가져온 이미지를 DB에 저장

    upload(req, res, err => {
        if(err) {
            return req.json({ success: false, err })
        }
        return res.json({ success: true, filePath:res.req.file.path, fileName: res.req.file.filename})
    })
})

router.post('/', (req, res) => {

  // 받아온 정보들은 db에 넣어준다
const product = new Product(req.body)
product.save((err) => {
  if(err) return res.status(400).json({ success: false, err})
  return res.status(200).json({ success: true})
})

})

router.post('/products', (req, res) => {
  //prodcut collection에 들어있는 모든 상품정보를 가져오기

  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  Product.find()
    .populate("writer") // 등록한 정보들을 가져오는 것
    .skip(skip)
    .limit(limit)
    .exec((err, productInfo) => {
      if(err) return res.status(400).json({ success: false, err})
      return res.status(200).json({ success: true, productInfo, postSize: productInfo.length})
    })

})

module.exports = router;
