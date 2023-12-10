import { useForm } from "react-hook-form";
import Style from "./formulario.module.css";
import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';
import { TbLock, TbLockOpen } from "react-icons/tb";

function formulario() {

    const [isAdmin, setAdmin] = useState()

    const [producto, setProducto] = useState(null);
    const [dataProduct, setDataProduct] = useState({})
    const [dataProductForCreate, setDataProductForCreate] = useState({})
    const [message, setMessage] = useState(null)

    const { register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm({
        defaultValues: {
            name: producto ? producto.name : '',
            description: producto ? producto.description : '',
            category: producto ? producto.category : '',
            color: producto ? producto.color : '',
            price: producto ? producto.price : ''
        }
    });

    function buttonFunction() {
        setAdmin(!isAdmin);
    }

    const { id } = useParams();

    const createProduct = async (data) => {
        try {
            await fetch(`http://localhost:3030/api/admin/createProduct/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            setMessage('Producto Creado')
            reset()
        } catch (error) {
            console.log(error);
        }
    };

    const editProduct = async (data) => {
        try {
            await fetch(`http://localhost:3030/api/admin/editProduct/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),

            });
            setMessage('Producto Editado');
            reset()
        } catch (error) {
            console.log(error);
        }
    };

    const deleteProduct = async () => {
        try {
            await fetch(`http://localhost:3030/api/admin/deleteProduct/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            setMessage('Producto Eliminado')
            reset()
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (Object.keys(dataProduct).length > 0) {
            editProduct(dataProduct)
        }
    }, [dataProduct])

    const handleDeleteButton = () => {
        deleteProduct();
    };

    const onSubmit = handleSubmit((data) => {
        let imgName = data.image && data.image.length > 0 ? data.image[0].name : 'producto.png'
        data.image = imgName
        setDataProduct(data)
    })

    const handleCreateButton = () => {
        handleSubmit((data) => {
            let imgName = data.image && data.image.length > 0 ? data.image[0].name : 'producto.png';
            data.image = imgName;
            setDataProductForCreate(data)
        })();
    };

    useEffect(() => {
        if (Object.keys(dataProductForCreate).length > 0) {
            createProduct(dataProductForCreate)
        }
    }, [dataProductForCreate])

    useEffect(() => {
        fetch(`http://localhost:3030/api/products/${id}`)
            .then(response => response.json())
            .then(data => {
                setProducto(data.data)
            })
            .catch(error => console.log(error))
    }, [id])


    useEffect(() => {
        if (producto) {
            setValue('name', producto.name);
            setValue('description', producto.description);
            setValue('category', producto.category_id);
            setValue('color', producto.color_id);
            setValue('price', producto.price);
        }
    }, [producto]);

    return (
        <div className={Style.form} >
            <h1>Editar producto</h1>
            {producto ? (
                <form onSubmit={onSubmit}>
                    <div className={Style.inputConteiner}>
                        <label htmlFor="name">Nombre del producto:</label>
                        <input type="text" id="name" name="name" {...register('name', {
                            required: {
                                value: true,
                                message: 'Campo vacio'
                            },
                            minLength: {
                                value: 4,
                                message: 'Debe tener minimo 4 caracteres'
                            }
                        })
                        } />
                        {errors.name && (
                            <span>{errors.name.message}</span>
                        )}
                    </div>

                    <div className={Style.inputConteiner}>
                        <label htmlFor="description">Descripción:</label>
                        <input type="text" id="description" name="description" {...register('description', {
                            required: {
                                value: true,
                                message: 'Campo vacio'
                            },
                            minLength: {
                                value: 8,
                                message: 'Debe tener minimo 8 caracteres'
                            }
                        })} />
                        {errors.description && (
                            <span>{errors.description.message}</span>
                        )}
                    </div>

                    <div className={Style.inputConteiner}>
                        <label for="image">Imagenes:</label>
                        <input type="file" id="image" name="image" {...register('image')}></input>
                    </div>

                    <div className={Style.inputConteiner}>
                        <label htmlFor="category">Categoría a cambiar:</label>
                        <select id="category" name="category"
                            {...register('category', {
                                required: true,
                                message: 'campo vacio'
                            })}>
                            <option value disabled selected="">Seleccionar nueva categoria</option>
                            <option value="1">Celulares</option>
                            <option value="2">Accesorios</option>
                        </select>
                        {errors.category && (
                            <span>{errors.category.message}</span>
                        )}
                    </div>

                    <div className={Style.inputConteiner}>
                        <label for="colors">Colores:</label>
                        <select type="text" id="colors" name="color" {...register('color', {
                            required: {
                                value: true,
                                message: 'Campo vacio'
                            }
                        })}>
                            <option value disabled selected="">Seleccionar ElColor</option>
                            <option value="1">Blanco</option>
                            <option value="2">Dorado</option>
                            <option value="3">Negro</option>
                            <option value="4">Plaateado</option>
                        </select>
                        {errors.color && (
                            <span>{errors.color.message}</span>
                        )}
                    </div>

                    <div className={Style.inputConteiner}>
                        <label for="price">Precio:</label>
                        <input type="number" id="price" name="price" {...register('price', {
                            required: {
                                value: true,
                                message: 'Campo vacio'
                            },
                            min: {
                                value: 2,
                                message: 'Debe tener un precio mayor a 1$'
                            }
                        })} />
                        {errors.price && (
                            <span>{errors.price.message}</span>
                        )}
                    </div>
                    <div className={Style.conteinerButton}>
                        <div className={Style.btnAdmin} onClick={buttonFunction} type="none">Admin Powers {isAdmin ? (<TbLockOpen className={Style.lockOpen} />) : (<TbLock className={Style.lock} />)}
                        </div>
                        {isAdmin ? (
                            <div className={Style.childBox}>
                                <div className={Style.div} onClick={handleCreateButton}> Crear </div>
                                <button className={Style.btn} type="submit"> Editar </button>
                                <button className={Style.btn} onClick={handleDeleteButton}> Borrar </button>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    {message ? (
                        <div >
                            <p className={Style.msgFinal}>{message}</p>
                        </div>
                    ) : (
                        <></>
                    )}
                </form>

            ) : (
                <h1>CARGANDO PRODUCTO...</h1>
            )}
        </div>
    );
}

export default formulario;