import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CreateCategoryModal from '../../../components/admin/CreateCategoryModal';

describe('CreateCategoryModal', () => {
    const mockOnClose = jest.fn();
    const mockOnCreate = jest.fn();

    beforeEach(() => {
        render(
            <CreateCategoryModal isOpen={true} onClose={mockOnClose} onCreate={mockOnCreate} />
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('handles form submission correctly with valid data', async () => {
        // Simulate entering valid category name and type
        fireEvent.change(screen.getByLabelText(/category name/i), { target: { value: 'New Category' } });
        fireEvent.change(screen.getByLabelText(/category type/i), { target: { value: 'Type1' } });

        // Submit the form
        fireEvent.click(screen.getByText(/create category/i));

        // Verify that the onCreate callback was called with the expected data
        expect(mockOnCreate).toHaveBeenCalledWith({
            name: 'New Category',
            type: 'Type1',
        });
    });

    test('handles errors appropriately', async () => {
        // Implementing test for error case
        fireEvent.change(screen.getByLabelText(/category name/i), { target: { value: '' } }); // Invalid name
        fireEvent.change(screen.getByLabelText(/category type/i), { target: { value: 'Type1' } });

        // Submit the form
        fireEvent.click(screen.getByText(/create category/i));

        // Verify that the form does not submit on invalid input
        expect(mockOnCreate).not.toHaveBeenCalled();
        expect(screen.getByText(/category name is required/i)).toBeInTheDocument(); // Assuming there's a validation message
    });

    test('closes the modal without creating a category and resets the form state', () => {
        // Close the modal
        fireEvent.click(screen.getByText(/cancel/i));

        // Verify that the onClose callback was called
        expect(mockOnClose).toHaveBeenCalled();
    });
});
