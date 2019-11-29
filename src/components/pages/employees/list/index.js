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

export default class EmployeesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: []
    };
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    await this.getEmployees();
  };

  openNotification = (type, message, description) => {
    notification[type]({
      message,
      description
    });
  };

  getEmployees = async () => {
    const { data: employees } = await axios.get(`${API_BASE_URL}/employees`);

    this.setState({
      ...this.state,
      employees
    });
  };

  handleDelete = async (emp, index) => {
    const result = await confirm({
      title: "Deseja realmente deletar este funcionário?",
      message: "Esta ação não poderá ser desfeita.",
      confirmText: "Deletar",
      confirmColor: "danger",
      cancelText: "Cancelar",
      cancelColor: "secondary"
    });

    if (result) {
      await axios.delete(`${API_BASE_URL}/employees/${emp.id}`);

      // Removendo da listagem
      const employees = this.state.employees;

      employees.splice(index, 1);

      this.setState({ ...this.state, employees });

      this.openNotification(
        "success",
        "Registro Removido",
        "Registro removido com sucesso."
      );
    }
  };

  render() {
    const { employees } = this.state;

    return (
      <Col md={12}>
        <Row>
          <Col md={12}>
            <Button
              color={"primary"}
              className={"float-right mb-3"}
              tag={Link}
              to={"/employees/create"}
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
                <th>Departamento</th>
                <th className="codeIconsTd" colSpan={2}>
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => {
                return (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>{emp.name}</td>
                    <td>{emp.department.name}</td>
                    <td>
                      <Button
                        color={"warning"}
                        className={"btn-sm"}
                        tag={Link}
                        to={`/employees/${emp.id}/edit`}
                      >
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </Button>
                    </td>
                    <td>
                      <Button
                        color={"danger"}
                        className={"btn-sm"}
                        onClick={() => this.handleDelete(emp, index)}
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
