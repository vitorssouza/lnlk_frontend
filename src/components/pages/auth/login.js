import React, { Component } from "react";
import { Button, notification } from "antd";
import { Form, FormGroup, Input, Card, CardBody, CardHeader } from "reactstrap";

// Libs Import
import axios from "axios";

// App Imports
import { API_BASE_URL } from "../../../app-constants";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: ""
    };
  }
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ ...this.state, [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/auth/login`,
        this.state
      );

      console.log("token", data.token);

      if (data.token) {
        localStorage.setItem("token", data.token);
        this.props.history.push("/home");
      }
    } catch (e) {
      this.openNotificationLoginFailure();
    }
  };

  openNotificationLoginFailure = () => {
    notification["error"]({
      message: "Falha na autenticação",
      description: "Usuário e/ou senha incorretos!"
    });
  };

  render() {
    return (
      <div className="wrapper">
        <div className="block-center mt-4 wd-xl">
          <Card className="card-flat">
            <CardHeader className={"bg-dark text-center"}>
              <img src="/images/logo-white.png" alt="" width="50%" />
            </CardHeader>
            <CardBody>
              <p className="text-center login-title">
                IDENTIFIQUE-SE PARA CONTINUAR.
              </p>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Input
                    type={"text"}
                    placeholder={"Informe seu login"}
                    name="login"
                    onChange={this.handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Input
                    type={"password"}
                    placeholder={"Informe sua senha"}
                    name="password"
                    onChange={this.handleChange}
                    required
                  />
                </FormGroup>

                <Button
                  htmlType="submit"
                  type="primary"
                  className="float-right"
                >
                  Entrar
                </Button>
              </Form>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}
