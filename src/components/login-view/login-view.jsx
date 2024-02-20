import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const LoginView = ({onLoggedIn}) => {
  const [username, setUsername] = useState ("");
  const [password, setPassword] = useState ("");
  const loginURL = "https://myquickmovieapi.onrender.com/login"

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };
   
    fetch(loginURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("Login failed");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  }
  return (
 
    <Row >
      <Col >
       
          <Card className="shadow p-4 mb-4 bg-white mt-5 border-0 ">
            <Card.Body>
              <Card.Title className="card-title"> Login</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => {setUsername(e.target.value);
                  }}
                  required                     
                />                
              </Form.Group>
              <Form.Group>
                <Form.Label>Password: </Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value);}}
                    required                     
                  />               
              </Form.Group>
              <br/>
              <Button
                variant="primary"
                type="submit"
                onClick={handleSubmit}
                className="text-white"
              >
                Submit
              </Button>
            </Form>
            </Card.Body>
          </Card>
       
      </Col>
    </Row>
 
);
};

// Define PropTypes for LoginView
LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired, // This matches the onLoggedIn prop you're using
};