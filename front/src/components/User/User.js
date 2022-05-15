import React from "react";
import PropTypes from "prop-types";
import styles from "./User.module.scss";
import {
  Alert,
  Table,
  Button,
  Container,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";
import { useNavigate } from "react-router";

//Data temporal, luego traerla de DB
const data = [];

const BASE_URL = "http://localhost:4000/";
// const BASE_URL = process.env.REACT_APP_API_URL;
const PATH_USUARIOS = "usuarios";

const User = () => {
  const [modalActualizar, setModalActualizar] = React.useState(false);
  const [modalInsertar, setModalInsertar] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [errors, setErrors] = React.useState(null);
  const [newVal, setNewVal] = React.useState(0);
  const navigate = useNavigate();

  const [usuario, setUsuario] = React.useState({
    data: data,
    form: {
      nombre: "",
      cedula: "",
      telefono: "",
      estado: "",
      rol: "",
    },
  });

  React.useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`${BASE_URL}${PATH_USUARIOS}`, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setUsuario({
            ...usuario,
            data: result,
          });
        },
        (error) => {
          setIsLoaded(true);
          setErrors(error);
        }
      );
  }, [newVal]);

  const handleChange = (e) => {
    setUsuario((prevState) => ({
      ...prevState,
      form: {
        ...prevState.form,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const mostrarModalActualizar = (e) => {
    let arregloUsuarios = usuario.data;
    let userToModify;
    arregloUsuarios.map((registro) => {
      if (e.target.id === registro._id) {
        userToModify = registro;
      }
    });
    setUsuario({
      ...usuario,
      form: userToModify,
    });
    setModalActualizar(true);
  };

  const cerrarModalActualizar = () => {
    setModalActualizar(false);
  };

  const mostrarModalInsertar = () => {
    setModalInsertar(true);
  };

  const cerrarModalInsertar = () => {
    setModalInsertar(false);
  };

  const editar = () => {
    let usuarioAModificar = { ...usuario.form };
    actualizarUsuario(usuarioAModificar);
    setModalActualizar(false);
  };

  const eliminar = (e) => {
    let arregloUsuario = usuario.data;
    arregloUsuario.map((registro) => {
      if (e.target.id === registro._id) {
        let opcion = window.confirm(
          "¿Está seguro que desea eliminar el usuario " + registro.nombre + "?"
        );
        if (opcion) {
          borrarUsuario(registro._id);
        }
      }
    });
  };

  const insertar = () => {
    let usuarioACrear = { ...usuario.form };
    let name = usuario.form.nombre;
    let error = "";

    if (!name.value) {
      error = `${name} field cannot be empty`;
    }

    // crearUsuario(usuarioACrear);
    // setModalInsertar(false);
  };

  const crearUsuario = (usuarioACrear) => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuarioACrear),
    };
    fetch(`${BASE_URL}${PATH_USUARIOS}`, requestOptions).then(
      (response) => {
        response.json();
        setNewVal(newVal + 1);
      },
      (error) => {
        setIsLoaded(true);
        setErrors(error);
      }
    );
  };

  const borrarUsuario = (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`${BASE_URL}${PATH_USUARIOS}/${id}`, requestOptions)
      .then((result) => result.json())
      .then(
        (result) => {
          setNewVal(newVal + 1);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const actualizarUsuario = (usuario) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    };
    fetch(`${BASE_URL}${PATH_USUARIOS}/${usuario._id}`, requestOptions)
      .then((result) => result.json())
      .then(
        (result) => {
          setNewVal(newVal + 1);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  

  return (
    <Container>
      <br />
      <Row>
        <Col md="8">
          <h2>Modulo Usuarios</h2>
          <p>En este módulo podras administrar los usuarios.</p>
        </Col>
        <Col md="4" className="d-flex justify-content-end">
          <div className="align-self-end">
            <Button color="primary" onClick={mostrarModalInsertar}>
              Crear
            </Button>
          </div>
        </Col>
      </Row>
      <div className="table-container">
        <Table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cedula</th>
              <th>Telefono</th>
              <th>Estado</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {usuario.data.map((dato) => (
              <tr key={dato._id}>
                <td>{dato.nombre}</td>
                <td>{dato.cedula}</td>
                <td>{dato.telefono}</td>
                <td>{dato.estado}</td>
                <td>{dato.rol}</td>
                <td>
                  <Button
                    outline
                    color="primary"
                    id={dato._id}
                    onClick={mostrarModalActualizar}
                  >
                    Editar
                  </Button>{" "}
                  <Button color="danger" id={dato._id} onClick={eliminar}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal isOpen={modalActualizar}>
        <ModalHeader>
          <div>
            <h3>Actualizar Usuario {usuario.form._id}</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Id:</label>

            <input
              className="form-control"
              readOnly
              type="text"
              value={usuario.form._id}
            />
          </FormGroup>

          <FormGroup>
            <label>Nombre:</label>
            <input
              className="form-control"
              name="nombre"
              type="text"
              onChange={handleChange}
              required
              value={usuario.form.nombre}
            />
          </FormGroup>

          <FormGroup>
            <label>Cedula:</label>
            <input
              className="form-control"
              name="cedula"
              type="text"
              onChange={handleChange}
              value={usuario.form.cedula}
            />
          </FormGroup>

          <FormGroup>
            <label>Telefono:</label>
            <input
              className="form-control"
              name="telefono"
              type="text"
              onChange={handleChange}
              value={usuario.form.telefono}
            />
          </FormGroup>

          <FormGroup>
            <label>Estado:</label>
            <input
              className="form-control"
              name="estado"
              type="text"
              onChange={handleChange}
              value={usuario.form.estado}
            />
          </FormGroup>
          <FormGroup>
            <label>Rol:</label>
            <input
              className="form-control"
              name="rol"
              type="text"
              onChange={handleChange}
              value={usuario.form.rol}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={editar}>
            Actualizar
          </Button>
          <Button className="btn btn-danger" onClick={cerrarModalActualizar}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Crear usuario</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <Label for="input-name">Nombre:</Label>
            <Input
              id="input-name"
              className="form-control"
              name="nombre"
              type="text"
              onChange={handleChange}
              invalid
            />
            <FormFeedback>Oh noes! that name is already taken</FormFeedback>
          </FormGroup>

          <FormGroup>
            <label>Cedula:</label>
            <input
              className="form-control"
              name="cedula"
              type="text"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Telefono:</label>
            <input
              className="form-control"
              name="telefono"
              type="text"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Estado:</label>
            <input
              className="form-control"
              name="estado"
              type="text"
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <label>Rol:</label>
            <input
              className="form-control"
              name="rol"
              type="text"
              onChange={handleChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={insertar}>
            Crear
          </Button>
          <Button className="btn btn-danger" onClick={cerrarModalInsertar}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

User.propTypes = {};

User.defaultProps = {};

export default User;
