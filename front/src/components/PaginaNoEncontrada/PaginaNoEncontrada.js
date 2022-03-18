import React from 'react';
// import PropTypes from 'prop-types';
import styles from './PaginaNoEncontrada.module.scss';
import { Alert } from 'bootstrap';

const PaginaNoEncontrada = () => (
  <div className={styles.PaginaNoEncontrada} data-testid="PaginaNoEncontrada">
    <h1>404 Página no encontrada</h1>
  </div>
);

// PaginaNoEncontrada.propTypes = {};

// PaginaNoEncontrada.defaultProps = {};

export default PaginaNoEncontrada;
