const express = require('express')
const controller = require('./controller.js')
const router = require('express').Router()

router.get('/products', controller.getProducts)
router.get('/products/:product_id', controller.getProductId)
router.get('/products/:product_id/styles', controller.getProductStyle)
router.get('/products/:product_id/related', controller.getRelated)

module.exports = router