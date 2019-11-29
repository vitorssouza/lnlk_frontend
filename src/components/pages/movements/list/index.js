import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPencilAlt,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import confirm from "reactstrap-confirm";
import { notification } from "antd";
import * as utils from "jvss-utils-functions";

// Module Imports
import { API_BASE_URL } from "../../../../app-constants";

export default class MovementsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movements: []
    };
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    await this.getMovements();
  };

  openNotification = (type, message, description) => {
    notification[type]({
      message,
      description
    });
  };

  getMovements = async () => {
    const { data: movements } = await axios.get(`${API_BASE_URL}/movements`);

    this.setState({
      ...this.state,
      movements
    });
  };

  handleDelete = async (mov, index) => {
    const result = await confirm({
      title: "Deseja realmente deletar esta movimentação ?",
      message: "Esta ação não poderá ser desfeita.",
      confirmText: "Deletar",
      confirmColor: "danger",
      cancelText: "Cancelar",
      cancelColor: "secondary"
    });

    if (result) {
      await axios.delete(`${API_BASE_URL}/movements/${mov.id}`);

      // Removendo da listagem
      const movements = this.state.movements;

      movements.splice(index, 1);

      this.setState({ ...this.state, movements });

      this.openNotification(
        "success",
        "Registro Removido",
        "Registro removido com sucesso."
      );
    }
  };

  render() {
    const { movements } = this.state;

    const params = {
      symbol: "R$ ",
      separator: ".",
      decimal: ",",
      precision: 2,
      formatWithSymbol: true
    };

    return (
      <Col md={12}>
        <Row>
          <Col md={12}>
            <Button
              color={"primary"}
              className={"float-right mb-3"}
              tag={Link}
              to={"/movements/create"}
            >
              <FontAwesomeIcon icon={faPlus} /> Adicionar
            </Button>
          </Col>
        </Row>
        <Row>
          <table className="table table-striped table-hovered table-bordered">
            <thead>
              <tr>
                <th className="codeIconsTd">Código</th>
                <th>Descrição</th>
                <th>Funcionário</th>
                <th>Valor</th>
                <th className="codeIconsTd" colSpan={2}>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {movements.map((mov, index) => {
                return (
                  <tr key={mov.id}>
                    <td>{mov.id}</td>
                    <td>{mov.description}</td>
                    <td>{mov.employee.name}</td>
                    <td>{utils.money.formatMoney(mov.value)}</td>
                    <td>
                      <Button
                        color={"warning"}
                        className={"btn-sm"}
                        tag={Link}
                        to={`/movements/${mov.id}/edit`}
                      >
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </Button>
                    </td>
                    <td>
                      <Button
                        color={"danger"}
                        className={"btn-sm"}
                        onClick={() => this.handleDelete(mov, index)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Row>
      </Col>
    );
  }
}
