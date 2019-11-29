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

// Module Imports
import { API_BASE_URL } from "../../../../app-constants";

export default class DepartmentsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departments: []
    };
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    await this.getDepartments();
  };

  openNotification = (type, message, description) => {
    notification[type]({
      message,
      description
    });
  };

  getDepartments = async () => {
    const { data: departments } = await axios.get(
      `${API_BASE_URL}/departments`
    );

    this.setState({
      ...this.state,
      departments
    });
  };

  handleDelete = async (dept, index) => {
    const result = await confirm({
      title: "Deseja realmente deletar este departamento?",
      message: "Esta ação não poderá ser desfeita.",
      confirmText: "Deletar",
      confirmColor: "danger",
      cancelText: "Cancelar",
      cancelColor: "secondary"
    });

    if (result) {
      await axios.delete(`${API_BASE_URL}/departments/${dept.id}`);

      // Removendo da listagem
      const departments = this.state.departments;

      departments.splice(index, 1);

      this.setState({ ...this.state, departments });

      this.openNotification(
        "success",
        "Registro Removido",
        "Registro removido com sucesso."
      );
    }
  };

  render() {
    const { departments } = this.state;

    return (
      <Col md={12}>
        <Row>
          <Col md={12}>
            <Button
              color={"primary"}
              className={"float-right mb-3"}
              tag={Link}
              to={"/departments/create"}
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
                <th>Nome</th>
                <th className="codeIconsTd" colSpan={2}>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept, index) => {
                return (
                  <tr key={dept.id}>
                    <td>{dept.id}</td>
                    <td>{dept.name}</td>
                    <td>
                      <Button
                        color={"warning"}
                        className={"btn-sm"}
                        tag={Link}
                        to={`/departments/${dept.id}/edit`}
                      >
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </Button>
                    </td>
                    <td>
                      <Button
                        color={"danger"}
                        className={"btn-sm"}
                        onClick={() => this.handleDelete(dept, index)}
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
