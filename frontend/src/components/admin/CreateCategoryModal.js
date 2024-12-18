import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CreateCategoryModal = ({ onCreate, onClose }) => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryType, setCategoryType] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Validate the input fields
        if (!categoryName || !categoryType) {
            setError('Both category name and type are required.');
            return;
        }

        // Prepare the category data
        const newCategory = { name: categoryName, type: categoryType };

        // Call the onCreate callback with the new category data
        onCreate(newCategory);
        
        // Reset form
        setCategoryName('');
        setCategoryType('');
        setError('');
    };

    const handleClose = () => {
        // Reset state and close modal
        setCategoryName('');
        setCategoryType('');
        setError('');
        onClose();
    };

    return (
        <div className="modal">
            <h2>Create New Category</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="categoryName">Category Name:</label>
                    <input
                        type="text"
                        id="categoryName"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="categoryType">Category Type:</label>
                    <input
                        type="text"
                        id="categoryType"
                        value={categoryType}
                        onChange={(e) => setCategoryType(e.target.value)}
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit">Create Category</button>
                <button type="button" onClick={handleClose}>Cancel</button>
            </form>
        </div>
    );
};

CreateCategoryModal.propTypes = {
    onCreate: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default CreateCategoryModal;
