import React, { Component } from "react";

import { Row, Col, Form, Label, Input, FormGroup, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import { notification } from "antd";

// Module Imports
import { API_BASE_URL } from "../../../../app-constants";

export default class FormDepartments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ""
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    if (id) {
      this.getDeptartmentData(id);
    }
  }

  getDeptartmentData = async id => {
    const { data } = await axios.get(`${API_BASE_URL}/departments/${id}`);
    this.setState({ ...this.state, ...data });
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

    if (id) {
      const { data } = axios.patch(
        `${API_BASE_URL}/departments/${id}`,
        this.state
      );
    } else {
      const { data } = axios.post(`${API_BASE_URL}/departments`, this.state);
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

    this.props.history.push("/departments");
  };

  render() {
    return (
      <Col md={12}>
        <Row>
          <Col md={12}>
            <Form onSubmit={this.handleSubmit}>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label htmlFor="name"> Nome </Label>
                    <Input
                      type={"text"}
                      id={"name"}
                      name={"name"}
                      onChange={this.handleChange}
                      value={this.state.name}
                      maxLength={100}
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
