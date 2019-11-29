import React, { Component } from "react";

import { Row, Col, Form, Label, Input, FormGroup, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import { notification } from "antd";
import CurrencyInput from "react-currency-input";
import { decode } from "jsonwebtoken";

// Module Imports
import { API_BASE_URL } from "../../../../app-constants";

export default class FormMovements extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movementType: "REVENUES",
      description: "",
      value: "0.00",
      employees: []
    };
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    const { id } = this.props.match.params;
    await this.getEmployees();

    if (id) {
      this.getMovementData(id);
    }
  };

  getMovementData = async id => {
    const { data } = await axios.get(`${API_BASE_URL}/movements/${id}`);
    this.setState({ ...this.state, ...data });
  };

  getEmployees = async id => {
    const { data: employees } = await axios.get(`${API_BASE_URL}/employees`);
    this.setState({ ...this.state, employees, employeeId: employees[0].id });
  };

  openNotification = (type, message, description) => {
    notification[type]({
      message,
      description
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const { id } = this.props.match.params;

    const dataSave = this.state;
    delete dataSave.employees;

    if (id) {
      const { data } = axios.patch(`${API_BASE_URL}/movements/${id}`, dataSave);
    } else {
      const { data } = axios.post(`${API_BASE_URL}/movements`, dataSave);
    }

    if (id) {
      this.openNotification(
        "success",
        "Registro Atualizado",
        "Registro atualizado com sucesso."
      );
    } else {
      this.openNotification(
        "success",
        "Registro Inserido",
        "Registro Inserido com sucesso."
      );
    }

    this.props.history.push("/movements");
  };

  render() {
    const { employees } = this.state;
    return (
      <Col md={12}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label htmlFor="movementType"> Tipo de Movimentação </Label>
              <select
                id={"movementType"}
                name={"movementType"}
                onChange={this.handleChange}
                value={this.state.movementType}
                className={"form-control"}
                required
              >
                <option value="REVENUES">Entrada</option>
                <option value="EXPENSES">Saída</option>
              </select>
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label htmlFor="employeeId"> Funcionário </Label>
              <select
                id={"employeeId"}
                name={"employeeId"}
                onChange={this.handleChange}
                value={this.state.employeeId}
                className={"form-control"}
                required
              >
                {employees.map(emp => {
                  return (
                    <option key={emp.id} value={emp.id}>
                      {" "}
                      {emp.name}{" "}
                    </option>
                  );
                })}
              </select>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="description"> Descrição </Label>
                    <Input
                      type={"text"}
                      id={"description"}
                      name={"description"}
                      onChange={this.handleChange}
                      value={this.state.description}
                      required
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label htmlFor="value"> Valor </Label>
                    <CurrencyInput
                      name="value"
                      id="value"
                      className={"form-control"}
                      value={this.state.value}
                      onChangeEvent={this.handleChange}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Button
                    color={"primary"}
                    className={"btn-sm float-right mb-3"}
                    type={"submit"}
                  >
                    <FontAwesomeIcon icon={faSave} /> Salvar
                  </Button>

                  <Button
                    color={"danger"}
                    className={"btn-sm float-right mb-3 mr-3"}
                    onClick={this.props.history.goBack}
                  >
                    <FontAwesomeIcon icon={faArrowLeft} /> Cancelar
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Col>
    );
  }
}
