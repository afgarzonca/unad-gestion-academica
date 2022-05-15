import React, { useState } from "react";
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

async function loginUser(credentials) {
  return fetch('http://localhost:4000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }

export default function Login ({setToken}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }

  return <div className={styles.Login}>
    <Form className="mt-5" onSubmit={handleSubmit}>
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
                onChange={e => setUserName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="input-password">Password</Label>
              <Input
                id="input-password"
                name="password"
                placeholder="Ingrese su password "
                type="password"
                onChange={e => setPassword(e.target.value)}
              />
            </FormGroup>
            <Button color="success">Ingresar</Button>
            {/* <Button color="success">Ingresar</Button>{' '} */}
          </Col>
        </Row>
      </Container>
    </Form>
  </div>
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};

Login.defaultProps = {};
