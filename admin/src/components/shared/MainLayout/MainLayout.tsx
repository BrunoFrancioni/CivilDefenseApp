import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import { MainLayoutProps } from "./types";

const MainLayout: React.FC<MainLayoutProps> = ({ children, logOut }) => {

  return (
    <>
      <Header />

      <Container>
        <Row>
          <Col md={2}>
            <Sidebar />
          </Col>

          <Col>
            {children}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MainLayout;