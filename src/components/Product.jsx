import React, { useEffect, useRef, useState } from "react";

const Product = () => {
    const productUrl = "https://mockapi.io/projects/6627d743b625bf088c0a0109/products";
    const [products, setProducts] = useState([]);
    const modal = useRef();

    useEffect(() => {
        fetch(productUrl)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
            });
    }, []);

    const createProduct = (e) => {
        e.preventDefault();
        const productName = e.target.elements.product.value;
        const product = {
            productName: productValue,
        };
        fetch(productUrl, {
            method: "POST",
            body: JSON.stringify(product),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setProducts([...products, data]);
                e.target.reset();
            });
    };

    const deleteProduct = (id) => {
        fetch(`${productUrl}/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then(() => {
                setProducts(products.filter((product) => product.id !== id));
            });
    };

    const updateProduct = (e, id) => {
        e.preventDefault();
        const productName = e.target.elements.product.value;
        const updatedProduct = { id, product: productName };
        fetch(`${productUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedProduct),
        })
            .then((res) => res.json())
            .then((data) => {
                setProducts(products.map((product) => (product.id === id ? data : product)));
                closeModal();
            });
    };

    const [currentProduct, setCurrentProduct] = useState({ id: "", product: "" });

    const selectProduct = (product) => {
        setCurrentProduct(product);
        modal.current.show();
    }

    const closeModal = () => {
        setCurrentProduct({ id: "", product: "" });
        modal.current.close();
    }

    const toggleCompleted = (id) => {
        const productToUpdate = products.find((product) => product.id === id);
        const updatedProduct = {
            ...productToUpdate,
            completed: !productToUpdate.completed
        };
        fetch(`${productUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('La solicitud de actualización no fue exitosa');
            }
            return response.json();
        })
        .then((updatedProductFromServer) => {
            setProducts((prevProducts) =>
                prevProducts.map((product) => (product.id === id ? updatedProductFromServer : product))
            );
        })
        .catch((error) => {
            console.error('Error al actualizar el producto:', error);
        });
    };

    return (
        <div>
            {/* Formulario para crear un nuevo producto */}
            <form onSubmit={createProduct}>
                <input type="text" name="product" placeholder="Product Name" />
                <button type="submit">Add Product</button>
            </form>
            
            {/* Lista de productos */}
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.product}
                        <button onClick={() => deleteProduct(product.id)}>Delete</button>
                        <button onClick={() => selectProduct(product)}>Edit</button>
                        <button onClick={() => toggleCompleted(product.id)}>Toggle Completed</button>
                    </li>
                ))}
            </ul>

            {/* Modal para editar producto */}
            <div ref={modal}>
                <form onSubmit={(e) => updateProduct(e, currentProduct.id)}>
                    <input type="text" name="product" defaultValue={currentProduct.product} />
                    <button type="submit">Update Product</button>
                    <button type="button" onClick={closeModal}>Close</button>
                </form>
            </div>
        </div>
    );
}

export default Product;
