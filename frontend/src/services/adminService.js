import axios from 'axios';
import AuthService from './AuthService';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Ensure the API base URL is configured

/**
 * Sends a POST request to the backend API to create a new category with the specified details.
 * @param {string} categoryName - The name of the category to be created.
 * @param {number} transactionTypeId - The ID of the transaction type associated with the category.
 * @returns {Promise} - Returns the response from the API or throws an error with a message.
 */
const createCategory = async (categoryName, transactionTypeId) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/category/create`,
            {
                categoryName,
                transactionTypeId
            },
            {
                headers: AuthService.authHeader()
            }
        );
        return response.data; // Return the data from the response
    } catch (error) {
        // Error handling to return a user-friendly error message
        if (error.response) {
            throw new Error(`Error: ${error.response.data.message || error.message}`);
        } else if (error.request) {
            throw new Error('Error: No response was received from the server.');
        } else {
            throw new Error(`Error: ${error.message}`);
        }
    }
};

/**
 * Other service functions can be added here
 */

export default {
    createCategory,
    // other exported functions like updatecategory, disableOrEnableCategory, get_categories, etc.
};
