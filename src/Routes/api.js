const express=require('express');
const Sales = require('../Controller/SalesController');
const router=express.Router();
;
router.get("/sales/total-revenue", Sales.totalRevenue);
router.get("/sales/quantity-by-product",Sales.quantityByProduct);
router.get("/sales/top-products", Sales.topProducts); 
router.get("/sales/average-price",Sales.averagePrice);
router.get("/sales/revenue-by-month",Sales.revenueByMonthth);
router.get("/sales/highest-quantity-sold",Sales.highestQuantitySold);
router.get("/sales/department-salary-expense",Sales.departmentSalesExpense);

module.exports=router;