import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import axios from 'axios';

function UserId(ide) {
    const baseUrl = "http://localhost/proyecto_backend/users.php";
    const [dataC, setDataC] = useState([]);
    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const ids =ide;
    console.log(ide);
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

    const peticionGetId = async (ids) => {
      
        await axios.get(baseUrl+"?id="+ids)
            .then(response => {
                setDataC(response.data);
                console.log(dataC);

                
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
        var f = {

        "nombres": frameworkSeleccionado.nombres,
        "apellidos": frameworkSeleccionado.apellidos,
        "email": frameworkSeleccionado.email,
        "genero" :frameworkSeleccionado.genero,
        "direccion": frameworkSeleccionado.direccion,
        }
        
        
        await axios.put(baseUrl, f, { params: { id: frameworkSeleccionado.id } })
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
                setData(dataNueva);
                abrirCerrarModalEditar();
            }).catch(error => {
                console.log(error);
            })
    }

    const peticionDelete = async () => {
        var f = new FormData();
        f.append("METHOD", "DELETE");
        await axios.post(baseUrl, f, { params: { id: frameworkSeleccionado.id } })
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
        peticionGetId(ide);
    }, [])
    return (
<div style={{ textAlign: 'center' }}>
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

     
         <tr key={dataC.id}>
             <td>{dataC.id}</td>
             <td>{dataC.nombres}</td>
             <td>{dataC.apellidos}</td>
             <td>{dataC.email}</td>
             <td>{dataC.genero}</td>
             <td>{dataC.direccion}</td>
             <td>
                 <button className="btn btn-primary" onClick={() => seleccionarFramework(dataC, "Editar")}>Editar</button> {"  "}
                 <button className="btn btn-danger" onClick={() => seleccionarFramework(dataC, "Eliminar")}>Eliminar</button>
             </td>
         </tr>

     


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
    )
}

export default UserId;