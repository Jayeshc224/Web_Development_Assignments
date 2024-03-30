import { Button, Form, Card } from 'react-bootstrap';
import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Login() {
    const navigate = useNavigate();


    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const goHome = async (event) => {
        const email = emailInput.current.value;
        const password = passwordInput.current.value;
        event.preventDefault();

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            params: {
              email: email,
            //   password: password,
            },
          };

        const response = await axios.get('http://localhost:3000/user/login', requestOptions)
        if (response.data.success) {

            console.log(response.data)
        }


    }


    const styles = { backgroundColor: '#00ab41', padding: '20px' }
    return (
        <>
            <div className="d-flex align-items-center  
                        justify-content-center vh-100" style={styles}>
                <Card style={{ width: '20rem' }}>
                    <Card.Body>
                        <Card.Title>Please Login</Card.Title>
                        <Card.Text>
                            <Form >
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control ref={emailInput} type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}
                                        value={email} required={true} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control ref={passwordInput} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}
                                        value={password} required={true} />
                                </Form.Group>
                            </Form>
                        </Card.Text>
                        <Button variant="primary" type='submit' onClick={goHome} >LOGIN</Button>
                    </Card.Body>
                </Card>
            </div>
        </>
    )

}


export default Login;