const express =  require('express');
const { PrismaClient } = require('@prisma/client');
var router = express.Router();
const prisma = new PrismaClient

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const packages = await prisma.package.findMany({ where: {category: {
    equals: 'Package'
  }}})
  const refrigerators = await prisma.package.findMany({ where: {category: {
    equals: 'Refrigerator'
  }}})

  const w_ds = await prisma.package.findMany({ where: {category: {
    equals: 'Washer/Dryer'
  }}})

  res.render('orderform', {title: "Order Form", packages, refrigerators, w_ds});
});

router.get('/packageItems', async (req, res, next) => {
  const packageItems = await prisma.packageItem.findMany({where: {package_id: {equals: parseInt(req.query.packageId) }}, include: {
    package: true,
    item: true
  }, orderBy: {priority: 'asc'}})
  res.json({message: "tyler likes fish", packageItems})
})

module.exports = router;