import React from "react";
import PropTypes from "prop-types";
import styles from "./Login.module.scss";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  Container,
} from "reactstrap";

const Login = () => (
  <div className={styles.Login}>
    <Form className="mt-5">
      <Container>
        <Row form className="justify-content-md-center">
          <Col md={{ size: 6, offset: 3}}>
            <FormGroup>
              <Label for="input-email">Email</Label>
              <Input
                id="input-email"
                name="email"
                placeholder="Ingrese su Email"
                type="email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="input-password">Password</Label>
              <Input
                id="input-password"
                name="password"
                placeholder="Ingrese su password "
                type="password"
              />
            </FormGroup>
            <Button color="success">Ingresar</Button>{' '}
          </Col>
        </Row>
      </Container>
    </Form>
  </div>
);

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
