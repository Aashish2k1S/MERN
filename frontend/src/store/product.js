import { create } from 'zustand'

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),

    createProduct: async (newProducts) => {

        if (!newProducts.name || !newProducts.price || !newProducts.image) {
            return { success: false, message: 'Please provide product details correctly.' }
        }

        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProducts)
            })

            const data = await res.json();
            set((state) => ({ products: [...state.products, data.data] }))

            return { success: true, message: 'Product created successfully.' }

        } catch (error) {
            return { success: false, message: error.message }
        }

    },

    fetchProducts: async () => {
        const res = await fetch('/api/products', {
            method: 'GET'
        })
        const data = await res.json();
        set({ products: data.data })
    },

    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: 'DELETE',
        });

        const data = await res.json();

        if (!data.success) return { success: false, message: data.message };

        // update the ui immediately, without needing a refresh
        set((state) => ({ products: state.products.filter(product => product._id !== pid) }));

        return { success: true, message: 'Product Deleted Successfully.' }
    },

    updateProduct: async (pid, updatedProduct) => {

        if (!updatedProduct.name || !updatedProduct.price || !updatedProduct.image) {
            return { success: false, message: 'Please provide product details correctly.' }
        }

        try {
            const res = await fetch(`/api/products/${pid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProduct)
            });

            const data = await res.json();
            if (!data.success) return { success: false, message: data.message }

            //update the ui immediately, withouit needing a refresh
            set((state) => ({
                products: state.products.map((product) => (product._id === pid ? data.data : product))
            }));

            return { success: true, message: 'Product updated successfully.' }

        } catch (error) {
            return { success: false, message: error.message }
        }
    }

}));
