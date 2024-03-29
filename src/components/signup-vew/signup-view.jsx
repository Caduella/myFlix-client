import React from 'react'
import{ useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const signupURL = "https://myquickmovieapi.onrender.com/signup"
  
  const handleSubmit = (event) => {
   event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch(signupURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

return (
  <Row>
  <Col> 
  <Card className="shadow p-4 mb-4 bg-white mt-5 border-0 ">
    <Card.Body >
      <Card.Title className="card-title" >Signup</Card.Title>
  <Form onSubmit={handleSubmit}>
  <Form.Group controlId="signUpFormUsername">
    <Form.Label>Username:</Form.Label>
    <Form.Control
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      required
      minLength="3"
    />
  </Form.Group>
  <Form.Group controlId="signUpFormPassword">
    <Form.Label>Password:</Form.Label>
    <Form.Control
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
  </Form.Group>
  <Form.Group controlId="signUpFormEmail">
    <Form.Label>Email:</Form.Label>
    <Form.Control
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  </Form.Group>
  <Form.Group controlId="signUpFormBirthday">
    <Form.Label>Birthday:</Form.Label>
    <Form.Control
      type="date"
      value={birthday}
      onChange={(e) => setBirthday(e.target.value)}
      required
    />
  </Form.Group> 
  <br/> 
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</Card.Body>
  </Card>
  </Col>
</Row>
  );
};
