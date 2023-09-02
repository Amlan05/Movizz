import React, { useState } from "react";
import "../Components.css";
import { Link } from "react-router-dom";

const AuthForm = (props) => {
  
  //isAdmin
  const [isSignup, setIsSignup] = useState(false);
  const [input, setInput] = useState({});

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submission = (e) => {
    e.preventDefault();

    props.gettingInput({input, signup: props.isAdmin ? false : isSignup} );
  };

  return (
    <div className="container-fluid ">
      <div className="row justify-content-center align-items-center AuthForm">
        <div className="col-md-4 auth-cont">
          <form onSubmit={submission}>
            <div className="upperH">
              <h3 className="lgn">{isSignup ? "SIGNUP" : "LOGIN"}</h3>
              <h3 type="button" className="cross">
                <Link to='/'><i className="bi bi-x"></i></Link>
              </h3>
            </div>

            {!props.isAdmin && isSignup && (
              <>
                <div className="mb-3">
                  <label for="exampleInputName1" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    // value=""
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputName1"
                    aria-describedby="nameHelp"
                  />
                </div>
              </>
            )}
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div className="row justify-content-center lgn-btn">
              <div className="col lgn-btn">
                <button type="submit" className="btn btn-primary lgn-btn">
                  {isSignup ? "Signup" : "Login"}
                </button>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col lgn-cond">
                {!props.isAdmin && (
                  <div type="button" onClick={() => setIsSignup(!isSignup)}>
                    {isSignup ? "Login Instead" : "Signup Instead"}
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
