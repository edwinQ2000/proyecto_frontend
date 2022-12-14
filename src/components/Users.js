import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

function Users() {
    const baseUrl = "http://localhost/proyecto_backend/users.php";
    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [frameworkSeleccionado, setFrameworkSeleccionado] = useState({
        id: '',
        nombres: '',
        apellidos: '',
        email: '',
        genero: '',
        direccion: ''
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
            "nombres": frameworkSeleccionado.nombres,
            "apellidos": frameworkSeleccionado.apellidos,
            "email": frameworkSeleccionado.email,
            "genero": frameworkSeleccionado.genero,
            "direccion": frameworkSeleccionado.direccion
        
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
        "id": frameworkSeleccionado.id,
        "nombres": frameworkSeleccionado.nombres,
        "apellidos": frameworkSeleccionado.apellidos,
        "email": frameworkSeleccionado.email,
        "genero" :frameworkSeleccionado.genero,
        "direccion": frameworkSeleccionado.direccion,
        }
        
       
        await axios.put(baseUrl, f)
            .then(response => {
                let dataNueva = data;
               
                dataNueva.map(framework => {
                    if (framework.id === frameworkSeleccionado.id) {
                        framework.nombres = frameworkSeleccionado.nombres;
                        framework.apellidos = frameworkSeleccionado.apellidos;
                        framework.email = frameworkSeleccionado.email;
                        framework.genero = frameworkSeleccionado.genero;
                        framework.direccion = frameworkSeleccionado.direccion;
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
       
        await axios.delete(baseUrl+"?id="+frameworkSeleccionado.id)
            .then(response => {
                setData(data.filter(framework => framework.id !== frameworkSeleccionado.id));
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
            <input placeholder='Ingrese id' id="id"></input>
            <Button variant="outline-success" href='/userId?id=1'>Consultar usuario</Button>{''}
            <br/>
            <button className="btn btn-success" onClick={() => abrirCerrarModalInsertar()}>Insertar</button>
            <br /><br />
            
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Email</th>
                        <th>Genero</th>
                        <th>Direccion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>

                    {data.map(framework => (
                        <tr key={framework.id}>
                            <td>{framework.id}</td>
                            <td>{framework.nombres}</td>
                            <td>{framework.apellidos}</td>
                            <td>{framework.email}</td>
                            <td>{framework.genero}</td>
                            <td>{framework.direccion}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => seleccionarFramework(framework, "Editar")}>Editar</button> {"  "}
                                <button className="btn btn-danger" onClick={() => seleccionarFramework(framework, "Eliminar")}>Eliminar</button>
                            </td>
                        </tr>

                    ))}


                </tbody>

            </table>

        

            






            <Modal isOpen={modalInsertar}>
                <ModalHeader>Insertar Usuario</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>nombres: </label>
                        <br />
                        <input type="text" className="form-control" name="nombres" onChange={handleChange} />
                        <br />
                        <label>apellidos: </label>
                        <br />
                        <input type="text" className="form-control" name="apellidos" onChange={handleChange} />
                        <br />
                        <label>email: </label>
                        <br />
                        <input type="text" className="form-control" name="email" onChange={handleChange} />
                        <br />
                        <label>genero: </label>
                        <br />
                        <input type="text" className="form-control" name="genero" onChange={handleChange} />
                        <br />
                        <label>direccion: </label>
                        <br />
                        <input type="text" className="form-control" name="direccion" onChange={handleChange} />
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-primary" href="/Users" onClick={() => peticionPost()}>Insertar</button>{"   "}
                    <button className="btn btn-danger" onClick={() => abrirCerrarModalInsertar()}>Cancelar</button>
                </ModalFooter>
            </Modal>



            <Modal isOpen={modalEditar}>
                <ModalHeader>Editar Framework</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>nombres: </label>
                        <br />
                        <input type="text" className="form-control" name="nombres" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.nombres} />
                        <br />
                        <label>apellidos: </label>
                        <br />
                        <input type="text" className="form-control" name="apellidos" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.apellidos} />
                        <br />
                        <label>email: </label>
                        <br />
                        <input type="text" className="form-control" name="email" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.email} />
                        <br />
                        <label>genero: </label>
                        <br />
                        <input type="text" className="form-control" name="genero" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.genero} />
                        <br />
                        <label>direccion: </label>
                        <br />
                        <input type="text" className="form-control" name="direccion" onChange={handleChange} value={frameworkSeleccionado && frameworkSeleccionado.direccion} />
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
                    ¿Estás seguro que deseas eliminar el Framework {frameworkSeleccionado && frameworkSeleccionado.nombres}?
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

export default Users;
