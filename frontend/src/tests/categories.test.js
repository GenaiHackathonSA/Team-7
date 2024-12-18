// frontend/src/tests/categories.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminCategoriesManagement from '../../pages/admin/categories';
import AdminService from '../../services/adminService';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../services/adminService');

describe('AdminCategoriesManagement', () => {
    test('testOpenCreateCategoryModal', () => {
        render(<AdminCategoriesManagement />);
        
        // Simulate clicking the button to open the modal
        const button = screen.getByRole('button', { name: /add category/i });
        fireEvent.click(button);
        
        // Check if the modal opens
        expect(screen.getByText(/create new category/i)).toBeInTheDocument();
    });

    test('testHandleCreateCategory', async () => {
        render(<AdminCategoriesManagement />);
        
        // Simulate opening the create category modal
        const button = screen.getByRole('button', { name: /add category/i });
        fireEvent.click(button);

        // Fill in the category details
        fireEvent.change(screen.getByLabelText(/category name/i), { target: { value: 'New Category' } });
        fireEvent.change(screen.getByLabelText(/transaction type/i), { target: { value: 'Type1' } });

        // Mock the API response for a successful creation
        AdminService.createCategory.mockResolvedValueOnce({
            data: { status: 'SUCCESS' }
        });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        // Wait for the categories to refresh or modal to close
        await waitFor(() => {
            expect(screen.queryByText(/create new category/i)).not.toBeInTheDocument();
        });

        // Check if the API was called
        expect(AdminService.createCategory).toHaveBeenCalledWith({
            categoryName: 'New Category',
            transactionType: 'Type1'
        });
    });

    test('testHandleCreateCategory with failure', async () => {
        render(<AdminCategoriesManagement />);
        
        // Simulate opening the create category modal
        const button = screen.getByRole('button', { name: /add category/i });
        fireEvent.click(button);

        // Fill in the category details
        fireEvent.change(screen.getByLabelText(/category name/i), { target: { value: 'New Category' } });
        fireEvent.change(screen.getByLabelText(/transaction type/i), { target: { value: 'Type1' } });

        // Mock the API response for a creation failure
        AdminService.createCategory.mockRejectedValueOnce(new Error('Error creating category'));

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        // Check for an error message displayed to the user
        await waitFor(() => {
            expect(screen.getByText(/error creating category/i)).toBeInTheDocument();
        });
    });
});
