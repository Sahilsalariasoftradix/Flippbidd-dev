/**
 * Property Controller
 * 
 * Handles the logic between PropertyModel and Views
 */
import PropertyModel from '../models/PropertyModel';

class PropertyController {
  constructor() {
    this.propertyModel = PropertyModel;
  }

  // Get property key features for homepage
  getKeyFeatures() {
    return this.propertyModel.getFeatures();
  }

  // Get polygon search features for homepage
  getPolygonFeatures() {
    return this.propertyModel.getPolygonFeatures();
  }

  // Handle property search
  async searchProperties(address) {
    if (!address || address.trim() === '') {
      return {
        success: false,
        message: 'Please enter a valid address',
        data: []
      };
    }

    try {
      return await this.propertyModel.searchByAddress(address);
    } catch (error) {
      return {
        success: false,
        message: 'Error searching properties. Please try again.',
        data: []
      };
    }
  }
}

// Singleton instance
const propertyControllerInstance = new PropertyController();
export default propertyControllerInstance; 