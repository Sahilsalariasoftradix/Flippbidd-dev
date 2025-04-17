/**
 * Property Model
 * 
 * Handles the data and business logic related to properties
 */
class PropertyModel {
  constructor() {
    this.properties = [];
    this.features = [
      { id: 1, title: 'Source Off-Market Deals', icon: 'blue_tick_ic.svg' },
      { id: 2, title: 'Polygon Lead Search', icon: 'blue_tick_ic.svg' },
      { id: 3, title: 'Showcase Your Investments', icon: 'blue_tick_ic.svg' },
      { id: 4, title: 'Property Data & Comps', icon: 'blue_tick_ic.svg' },
      { id: 5, title: 'Network - In App Calls/Messaging', icon: 'blue_tick_ic.svg' },
      { id: 6, title: 'National Skiptracing, and More...', icon: 'blue_tick_ic.svg' },
    ];
    
    this.polygonFeatures = [
      { id: 1, title: 'FSBO (Coming Soon)', icon: 'blue_tick_ic.svg' },
      { id: 2, title: 'Retiree Homeowners', icon: 'blue_tick_ic.svg' },
      { id: 3, title: 'Expired Listing (Coming Soon)', icon: 'blue_tick_ic.svg' },
      { id: 4, title: 'Tax Delinquency', icon: 'blue_tick_ic.svg' },
      { id: 5, title: 'Pre-Foreclosure', icon: 'blue_tick_ic.svg' },
      { id: 6, title: 'Foreclosure', icon: 'blue_tick_ic.svg' },
      { id: 7, title: 'High Equity', icon: 'blue_tick_ic.svg' },
      { id: 8, title: 'Lis Pendens', icon: 'blue_tick_ic.svg' },
    ];
  }

  // Get property features
  getFeatures() {
    return this.features;
  }

  // Get polygon search features
  getPolygonFeatures() {
    return this.polygonFeatures;
  }

  // Mock function to search properties by address
  searchByAddress(address) {
    return new Promise((resolve) => {
      // Simulate API call with timeout
      setTimeout(() => {
        resolve({
          success: true,
          message: `Found results for: ${address}`,
          data: []
        });
      }, 500);
    });
  }
}

// Singleton instance
const propertyModelInstance = new PropertyModel();
export default propertyModelInstance; 