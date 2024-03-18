// Importing the DashboardService
const dashboardService = require('../services/DashboardService');

// Exporting an object with a method to get data for the dashboard
module.exports = {
  // Async function to handle the request for dashboard data
  getDataForDashboard: async (req, res) => {
    try {
      // Calling the getDataForDashboard function from the DashboardService
      const obj = await dashboardService.getDataForDashboard();

      // Sending a successful response with the retrieved data
      return res.status(200).json({
        success: true,
        message: "Successfully retrieved data for the dashboard",
        obj,
      });
    } catch (error) {
      // Handling errors and sending an error response
      return res.status(500).json({
        message: "Error in getting data for the dashboard",
        error: error.message,
      });
    }
  },
};
