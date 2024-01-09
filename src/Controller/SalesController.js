const Sales = require('../Model/SalesModel');
// const { ObjectId } = require('mongoose').Types;
// Toal Revenue
exports.totalRevenue=async (req, res)=>
{
    try {
        const totalRevenue = await Sales.aggregate([
          {
            $group: {
              _id: null,
              total: { $sum: { $multiply: ['$quantity', '$price'] } }
            }
          }
        ]);
  
        res.json({ totalRevenue: totalRevenue[0].total });
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
}




// // quantity by product
exports.quantityByProduct=async (req, res)=>{
  try {
      const quantityByProduct = await Sales.aggregate([
        {
          $group: {
            _id: '$product',
            totalQuantity: { $sum: '$quantity' }
          }
        }
      ]);

      res.json({ quantityByProduct });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }

}

// // top products
exports.topProducts=async (req, res)=>{
  try {
    const topProducts = await Sales.aggregate([
      {
        $group: {
          _id: '$product',
          totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } }
        }
      },
      {
        $sort: { totalRevenue: -1 }
      },
      {
        $limit: 5
      }
    ]);

    res.json({ topProducts });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// // average price

exports.averagePrice= async (req, res) => {
  try {
    const averagePrice = await Sales.aggregate([
      {
        $group: {
          _id: null,
          totalQuantity: { $sum: '$quantity' },
          totalPrice: { $sum: { $multiply: ['$quantity', '$price'] } }
        }
      },
      {
        $project: {
          _id: 0,
          averagePrice: { $divide: ['$totalPrice', '$totalQuantity'] }
        }
      }
    ]);

    res.json({ averagePrice: averagePrice[0].averagePrice });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


// // revenue by month
exports.revenueByMonthth = async (req, res) => {
  try {
    const revenueByMonth = await Sales.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$date' },
            month: { $month: '$date' }
          },
          totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } }
        }
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          month: '$_id.month',
          totalRevenue: 1
        }
      },
      {
        $sort: { year: 1, month: 1 }
      }
    ]);

    res.json({ revenueByMonth });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// // highest quantity sold
exports.highestQuantitySold= async (req, res) => {
  try {
    const highestQuantitySold = await Sales.aggregate([
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            product: "$product"
          },
          totalQuantity: { $sum: "$quantity" }
        }
      },
      {
        $sort: { totalQuantity: -1 }
      },
      {
        $limit: 1
      },
      {
        $project: {
          _id: 0,
          date: "$_id.date",
          product: "$_id.product",
          totalQuantity: 1
        }
      }
    ]);

    res.json({ highestQuantitySold: highestQuantitySold[0] });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


// // department sales expense 
exports.departmentSalesExpense = async (req, res) => {
  try {
    const departmentSalaryExpense = await Sales.aggregate([
      {
        $group: {
          _id: "$department",
          totalSalaryExpense: { $sum: { $multiply: ['$quantity', '$price'] } }
        }
      },
      {
        $project: {
          _id: 0,
          department: "$_id",
          totalSalaryExpense: 1
        }
      }
    ]);

    res.json({ departmentSalaryExpense });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}