import React, { useEffect, useRef, useState } from "react";
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa';
import Header from "./Header";

const Product = () => {
    const productUrl = "https://mockapi.io/projects/6627d743b625bf088c0a0109/products";
    const [products, setProducts] = useState([]);
    const modal = useRef();

    useEffect(() => {
        fetch(productUrl)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                console.log(data);
            });
    }, []);

    // función para crear un nuevo producto
    const createProduct = (e) => {
        e.preventDefault();
        const productValue = e.target.elements.product.value;
        const product = {
            product: productValue,
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
                console.log(data);
                setProducts([...products, data]);
                e.target.reset();
            });
    };

    // función para eliminar un producto a partir de su id
    const deleteProduct = (id) => {
        fetch(`${productUrl}/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setProducts(products.filter((product) => product.id !== id));
            });
    };

    // función para editar un producto a partir de su id
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
                console.log(data);
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

    // Botón de producto completo
    
        
        const toggleCompleted = (id) => {
            // Encuentra el producto a actualizar
            const productToUpdate = products.find((product) => product.id === id);
            
            // Crea una nueva versión del producto con el estado actualizado
            const updatedProduct = {
                ...productToUpdate,
                isClicked: !productToUpdate.isClicked
            };
            
            // Realiza la solicitud PUT para actualizar el producto en el servidor
            fetch(`${productUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            })
            .then((response) => response.json())
            .then((updatedProductFromServer) => {
                // Actualiza el estado local con el producto actualizado
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
                        <button onClick={() => deleteProduct(product.id)}><FaRegTrashAlt /></button>
                        <button onClick={() => selectProduct(product)}><FaEdit /></button>
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
