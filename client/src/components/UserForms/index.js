import React from "react";
import { Link } from "react-router-dom";
import { Row } from "../Grid";

const styles = {
    size: {
        width: "350px"
    }
}

const renderLinkForm = () => {
    if (window.location.pathname === "/SignIn") {
        return (
            <p>
                Not a member?
            <Link to="/SignUp" className="ml-1"> Sign Up</Link>
            </p>
        )
    }
    else if (window.location.pathname === "/SignUp") {
        return (
            <p>
            Have an Account?
                <Link to="/SignIn" className="ml-1"> Sign In</Link>
        </p>
        )
    }
    else {
        return (
            <p>
            Remember Password?
                <Link to="/SignIn" className="ml-1"> Sign In</Link>
        </p>
        )
    }
}

function UserForm({ children, onSubmit, onChange, email, password, title }) {
    return (
        <Row>
            <div className="border mx-auto text-center pt-3 mt-5" style={styles.size}>
                <h3 className="pb-3">{title}</h3>
                <form className="mx-auto w-100 px-3" onSubmit={onSubmit}>
                    {children}
                    <div className="form-group row">
                        <label htmlFor="inputEmail3" className="col-sm-3 col-form-label">Email</label>
                        <div className="col-sm-9">
                            <input type="email" className="form-control" id="inputEmail3" placeholder="Email"
                                name="email"
                                value={email}
                                onChange={onChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="inputPassword3" className="col-sm-3 col-form-label">Password</label>
                        <div className="col-sm-9">
                            <input type="password" className="form-control" id="inputPassword3" placeholder="Password"
                                name="password"
                                value={password}
                                onChange={onChange} />
                        </div>
                    </div>

                    {window.location.pathname === "/SignIn" ? (
                        <div>
                        <Link to="/Password" className="float-right">Forgot Password?</Link>
                    </div>
                    ) :(null)}
           
                    <br />

                    <div className={window.location.pathname === "/SignIn" ? "form-group row mt-3" : "form-group row" }>
                        <div className="col-sm-12">
                            <button type="submit" className="btn btn-primary w-50">{title}</button>
                        </div>
                    </div>
                </form>

                <hr />
              {renderLinkForm()}
            </div>
        </Row>
    );
}

export default UserForm;