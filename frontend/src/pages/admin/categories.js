import React, { useState, useEffect } from 'react';
import { AdminService } from '../../services/adminService';
import { Toaster, toast } from 'react-hot-toast';
import Container from '../../components/Container';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Info from '../../components/Info';
import CategoriesTableHeader from './CategoriesTableHeader';
import CategoriesTableBody from './CategoriesTableBody';
import CreateCategoryModal from '../../components/admin/CreateCategoryModal';
import { useCategories } from '../../hooks/useCategories';

function AdminCategoriesManagement() {
    const [data, isFetching] = useCategories([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const disableOrEnable = async (categoryId) => {
        await AdminService.disableOrEnableCategory(categoryId).then(
            (response) => {
                if (response.data.status === 'SUCCESS') {
                    window.location.reload();
                }
            },
            (error) => {
                toast.error("Failed to update category: Try again later!");
            }
        );
    };

    const openCreateCategoryModal = () => {
        setIsModalOpen(true);
    };

    const handleCreateCategory = async (categoryData) => {
        try {
            const response = await AdminService.createCategory(categoryData);
            if (response.data.status === 'SUCCESS') {
                renderCategories();
                toast.success("Category created successfully!");
                setIsModalOpen(false);
            } else {
                toast.error("Failed to create category: " + response.data.message);
            }
        } catch (error) {
            toast.error("An error occurred while creating the category: " + error.message);
        }
    };

    const renderCategories = async () => {
        // Logic to refresh category list could also go here
    };

    return (
        <Container activeNavId={6}>
            <Header title="Categories" />
            <Toaster />
            {(isFetching) && <Loading />}
            {(!isFetching) && (data.length === 0) && <Info text={"No categories found!"} />}
            {(!isFetching) && (data.length !== 0) && (
                <table>
                    <CategoriesTableHeader />
                    <CategoriesTableBody data={data} disableOrEnable={disableOrEnable} />
                </table>
            )}
            <button onClick={openCreateCategoryModal}>Add New Category</button>
            {isModalOpen && 
                <CreateCategoryModal 
                    onCreate={handleCreateCategory} 
                    onClose={() => setIsModalOpen(false)} 
                />
            }
        </Container>
    );
}

export default AdminCategoriesManagement;
