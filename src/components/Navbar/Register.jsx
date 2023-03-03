import axios from "../../axios";
import React from "react";
import { useState } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password === confirmPassword) {
      axios
        .post("/signUp", {
          username,
          email,
          password,
        })
        .then(() => {
          setShowSuccessMessage(true);
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        })
        .catch((error) => console.log(error));
    } else {
      alert("Passwords did not match");
    }
  };

  return (
    <section>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Username</label>
          <Input
            type="text"
            autoComplete="off"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <Input
            type="email"
            placeholder="Email"
            autoComplete="off"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Repeat Password</label>
          <Input
            type="password"
            placeholder=" Repeat Password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </Form.Field>

        <Button type="submit">Submit</Button>
      </Form>
      {showSuccessMessage && (
        <Message
          success
          header="Registration Successful!"
          content="Please Login"
        />
      )}
    </section>
  );
};

export default Register;
