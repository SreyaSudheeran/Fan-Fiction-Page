import React, { useState } from 'react';
import fanfictionImage from './fanfiction.jpg'; // Import the image
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const host = 'http://localhost:5000';
  let navigate = useNavigate();
  const [credential, setCredential] = useState({ username: "", email: "", password: "" });

  const onchange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credential),
    });
    const json = await response.json();
    console.log(json);
    if (json.sucess) {  // using json.success as per server response
      // redirect
      localStorage.setItem('token', json.authtoken);
      navigate("/");
    } else {
      alert("Wrong Credential");
    }
  };

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: '#9A616D' }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="d-flex justify-content-center align-items-center h-100">
            <MDBCol col="12" xl="10">
              <MDBCard className="shadow-2-strong" style={{ borderRadius: '1rem', height: '100%' }}>
                <MDBRow className="g-0" style={{ height: '100%' }}>
                  <MDBCol md="6" lg="5" className="d-none d-md-block">
                    <img
                      src={fanfictionImage} // Use the imported image
                      alt="login form"
                      className="img-fluid"
                      style={{ borderRadius: '1rem 0 0 1rem', height: '100%', width: '100%', objectFit: 'cover' }}
                    />
                  </MDBCol>
                  <MDBCol md="6" lg="7" className="d-flex align-items-center">
                    <MDBCardBody className="p-4 p-lg-5 text-black">
                      <form onSubmit={handleSubmit}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i className="fas fa-cubes fa-2x me-3" style={{ color: '#ff6219' }}></i>
                          <span className="h1 fw-bold mb-0">Story Verse</span>
                        </div>

                        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                          Sign into your account
                        </h5>
                        <MDBInput wrapperClass="mb-4" label="Username" id="form2Example27" type="text" size="lg" name='username' value={credential.username} onChange={onchange} />
                        <MDBInput wrapperClass="mb-4" label="Email address" id="form2Example17" type="email" size="lg" name='email' value={credential.email} onChange={onchange} />
                        <MDBInput wrapperClass="mb-4" label="Password" id="form2Example27" type="password" size="lg" name='password' value={credential.password} onChange={onchange} />

                        <div className="pt-1 mb-4">
                          <MDBBtn className="btn-dark btn-lg btn-block" type="submit">
                            Login
                          </MDBBtn>
                        </div>

                        <a className="small text-muted" href="#!">
                          Forgot password?
                        </a>
                        <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
                          Don't have an account?{' '}
                          <Link to="/Signup" style={{ color: '#393f81' }}>
                            Register here
                          </Link>
                        </p>
                        <a href="#!" className="small text-muted">
                          Terms of use.
                        </a>
                        <a href="#!" className="small text-muted">
                          Privacy policy
                        </a>
                      </form>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
}
