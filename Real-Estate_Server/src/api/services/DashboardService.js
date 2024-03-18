const dashboardRepository = require('../data-access/dashboardRepository'); // Importing the dashboard repository module

module.exports = {
  // Service function to retrieve data for the dashboard
  getDataForDashboard: async () => {
    try {
      // Getting the current date information
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      // Retrieving counts from the dashboard repository
      const products_count = await dashboardRepository.getProductsCount();
      const categories_count = await dashboardRepository.getCategoriesCount();
      const orders_count = await dashboardRepository.getOrdersCount();
      
      // Retrieving all orders from the dashboard repository
      const orders = await dashboardRepository.getAllOrders();

      // Creating an object to store product quantity information
      const productQuantityObj = {};

      // Calculating product quantities from orders
      orders.forEach((order) => {
        order.products.forEach((productData) => {
          const productId = productData.product._id;
          const quantity = productData.quantity;
          const name = productData.product.product_name;

          if (productQuantityObj.hasOwnProperty(productId)) {
            productQuantityObj[productId].quantity += quantity;
          } else {
            productQuantityObj[productId] = {
              quantity: quantity,
              name: name
            };
          }
        });
      });

      // Sorting products based on quantity
      const sortedProducts = Object.entries(productQuantityObj).sort(
        (a, b) => b[1].quantity - a[1].quantity
      );

      // Selecting the top 3 products
      const top3Products = sortedProducts.slice(0, 3);

      // Filtering orders for the current month and year
      const monthly_orders = orders.filter((order) => {
        return (
          order.created_at?.getMonth() === currentMonth &&
          order.created_at?.getFullYear() === currentYear
        );
      });

      // Calculating total sales and monthly sales
      const total_sales = orders.reduce((total, order) => {
        return total + order.total_price;
      }, 0);

      const monthly_sales = monthly_orders.reduce((total, order) => {
        return total + order.total_price;
      }, 0);

      // Constructing the final object with dashboard data
      const obj = {
        products_count,
        categories_count,
        orders_count,
        total_sales,
        monthly_sales,
        top3Products
      };

      return obj;
    } catch (error) {
      // Handling errors and re-throwing them
      throw error;
    }
  },
};
