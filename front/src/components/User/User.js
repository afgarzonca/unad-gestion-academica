import React from "react";
import PropTypes from "prop-types";
import styles from "./User.module.scss";
import {
  Alert,
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";


//Data temporal, luego traerla de DB
const data = [
  {
    _id: "21354646",
    nombre: "Andrés Garzón",
    cedula: "12315678",
    telefono: "1123312879",
    estado: "Activo",
    rol: "Tutor",
  },
  {
    _id: "21354647",
    nombre: "Jaime Perez",
    cedula: "124154",
    telefono: "567756",
    estado: "Activo",
    rol: "Estudiante",
  },{
    _id: "21354648",
    nombre: "Julian Ospina",
    cedula: "123123",
    telefono: "967654654",
    estado: "Activo",
    rol: "Estudiante",
  },
];

const User = () => {
  const [modalActualizar, setModalActualizar] = React.useState(false);
  const [modalInsertar, setModalInsertar] = React.useState(false);
  const [errors, setErrors] = React.useState(null);
  const [newVal, setNewVal] = React.useState(0);

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
            <Button outline color="secondary" block>
              Cerrar sesión
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
                    color="primary"
                    id={dato._id}
                    onClick={mostrarModalActualizar}
                  >
                    Editar
                  </Button>{" "}
                  <Button color="danger" id={dato._id}>
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
          <Button color="primary">
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
            <label>Nombre:</label>
            <input
              className="form-control"
              name="nombre"
              type="text"
              onChange={handleChange}
              required
            />
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
          <Button color="primary">
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
