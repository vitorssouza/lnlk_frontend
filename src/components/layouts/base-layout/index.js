import React, { Component } from "react";
import TopBar from "./navbar";
import { Card, CardBody } from "reactstrap";

export default class BaseLayout extends Component {
  state = {
    collapsed: false
  };

  render() {
    return (
      <>
        <TopBar />

        <Card>
          <CardBody>{this.props.children}</CardBody>
        </Card>

        <footer className="text-center center-vertically">
          <p>Lanlink 2019 © Criado por Vitor Souza</p>
        </footer>
      </>
    );
  }
}
