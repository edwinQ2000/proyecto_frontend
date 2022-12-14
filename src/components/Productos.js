import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';

function Productos() {
    const baseUrl = "http://localhost/proyecto_backend/productos.php";
    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [frameworkSeleccionado, setFrameworkSeleccionado] = useState({
        idproducto: '',
        users_id:'',
        tipo_idtipo: '',
        estado: '',
        
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFrameworkSeleccionado((prevState) => ({
            ...prevState,
            [name]: value
        }))
        console.log(frameworkSeleccionado);
    }

    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
    }

    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    }

    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    }

    const peticionGet = async () => {
        await axios.get(baseUrl)
            .then(response => {
                setData(response.data);
                console.log(data);
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionPost = async () => {
        const f = {
            "users_id": parseInt(frameworkSeleccionado.users_id),
            "tipo_idtipo":  parseInt(frameworkSeleccionado.tipo_idtipo),
            "estado": frameworkSeleccionado.estado,
          
        }
        console.log("-----------------");
       console.log(f);
       abrirCerrarModalInsertar();
        await axios.post(baseUrl, f)
            .then(response => {
                setData(data.concat(response.data));
                abrirCerrarModalInsertar();
                
            }).catch(error => {
                console.log(error);
            })
        
    }

    const peticionPut = async () => {
        const f = {
        "idproducto":  parseInt(frameworkSeleccionado.idproducto),
        "users_id":  parseInt(frameworkSeleccionado.users_id),
        "tipo_idtipo":  parseInt(frameworkSeleccionado.tipo_idtipo),
        "estado": frameworkSeleccionado.estado,
        }
        
       
        await axios.put(baseUrl, f)
            .then(response => {
                let dataNueva = data;
               
                dataNueva.map(framework => {
                    if (framework.idproducto === frameworkSeleccionado.idproducto) {
                        framework.users_id = frameworkSeleccionado.users_id;
                        framework.tipo_idtipo = frameworkSeleccionado.tipo_idtipo;
                        framework.estado = frameworkSeleccionado.estado;
                    }
                });
                console.log(response.data);
                setData(dataNueva);
                abrirCerrarModalEditar();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionDelete = async () => {
       
        await axios.delete(baseUrl+"?idproducto="+frameworkSeleccionado.idproducto)
            .then(response => {
                setData(data.filter(framework => framework.idproducto !== frameworkSeleccionado.idproducto));
                abrirCerrarModalEliminar();
            }).catch(error => {
                console.log(error);
            })
    }

    const seleccionarFramework = (framework, caso) => {
        setFrameworkSeleccionado(framework);

        (caso === "Editar") ?
            abrirCerrarModalEditar() :
            abrirCerrarModalEliminar()
    }

    useEffect(() => {
        peticionGet();
    }, [])

    return (

        <div style={{ textAlign: 'center' }}>

            <br />
            <button className="btn btn-success" onClick={() => abrirCerrarModalInsertar()}>Insertar</button>
            <br /><br />
            
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>idproducto</th>
                        <th>users_id</th>
                        <th>tipo_idtipo</th>
                        <th>estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>

                    {data.map(framework => (
                        <tr key={framework.idproducto}>
                            <td>{framework.idproducto}</td>
                            <td>{framework.users_id}</td>
                            <td>{framework.tipo_idtipo}</td>
                            <td>{framework.estado}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => seleccionarFramework(framework, "Editar")}>Editar</button> {"  "}
                                <button className="btn btn-danger" onClick={() => seleccionarFramework(framework, "Eliminar")}>Eliminar</button>
                            </td>
                        </tr>

                    ))}


                </tbody>

            </table>


            <Modal isOpen={modalInsertar}>
                <ModalHeader>Insertar Framework</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>users_id: </label>
                        <br />
                        <input type="text" className="form-control" name="users_id" onChange={handleChange} />
                        <br />
                        <label>tipo_idtipo: </label>
                        <br />
                        <input type="text" className="form-control" name="tipo_idtipo" onChange={handleChange} />
                        <br />
                        <label>estado: </label>
                        <br />
                        <input type="text" className="form-control" name="estado" onChange={handleChange} />
                        <br />
                        
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => peticionPost()}>Insertar</button>{"   "}
                    <button className="btn btn-danger" onClick={() => abrirCerrarModalInsertar()}>Cancelar</button>
                </ModalFooter>
            </Modal>



            <Modal isOpen={modalEditar}>
                <ModalHeader>Editar Framework</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>users_id: </label>
                        <br />
                        <input type="text" className="form-control" name="users_id" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.users_id} />
                        <br />
                        <label>tipo_idtipo: </label>
                        <br />
                        <input type="text" className="form-control" name="tipo_idtipo" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.tipo_idtipo} />
                        <br />
                        <label>estado: </label>
                        <br />
                        <input type="text" className="form-control" name="estado" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.estado} />
                        <br />
                        
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" onClick={() => peticionPut()}>Editar</button>{"   "}
                    <button className="btn btn-danger" onClick={() => abrirCerrarModalEditar()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEliminar}>
                <ModalBody>
                    ¿Estás seguro que deseas eliminar el Framework {frameworkSeleccionado && frameworkSeleccionado.users_id}?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => peticionDelete()}>
                        Sí
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => abrirCerrarModalEliminar()}
                    >
                        No
                    </button>
                </ModalFooter>
            </Modal>

        </div>
    );
}

export default Productos;