import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IntlMessages from "util/IntlMessages";
import InfoView from "components/InfoView";
import { awsUserSignIn } from "actions/Auth";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",

      password: "",
      disabled: true,
      email: null,
      password: null,
      errors: {
        email: "",
        password: ""
      }
    };
  }

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "email":
        this.setState({ email: event.target.value });
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";

        break;
      case "password":
        this.setState({ password: event.target.value });
        errors.password = value.length <= 0 ? "Password is not valid!" : "";

        break;
      default:
        break;
    }
    if (validateForm(this.state.errors)) {
      this.setState({
        disabled: false
      });
    } else {
      this.setState({
        disabled: true
      });
    }
  };

  handleSubmit = event => {
    const email = this.state.email;
    const password = this.state.password;
    event.preventDefault();
    if (
      validateForm(this.state.errors) &&
      email !== null &&
      email !== "" &&
      password !== null &&
      password !== ""
    ) {
      this.props.awsUserSignIn({ email, password });
    }
  };

  componentDidUpdate() {
    if (this.props.authUser !== null) {
      this.props.history.push("/");
    }
  }

  render() {
    const { email, password, errors } = this.state;
    return (
      <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
        <div className="app-login-main-content">
          <div className="app-logo-content d-flex align-items-center justify-content-center">
            <Link className="logo-lg" to="/" title="Jambo">
              <img
                src={require("assets/images/agentz_final-01.png")}
                alt="Agentz"
                title="Agentz"
                style={{ height: "150px" }}
              />
            </Link>
          </div>

          <div className="app-login-content">
            <div className="app-login-form">
              <form>
                <fieldset>
                  <TextField
                    label={<IntlMessages id="appModule.email" />}
                    fullWidth
                    //onChange={(event) => this.setState({email: event.target.value})}
                    type="email"
                    name="email"
                    onChange={this.handleChange}
                    noValidate
                    defaultValue={email}
                    margin="normal"
                    className="mt-0 mb-3 my-sm-3"
                  />
                  {errors.email.length > 0 && this.state.email.length > 0 && (
                    <span className="error">{errors.email}</span>
                  )}
                  <TextField
                    type="password"
                    label={<IntlMessages id="appModule.password" />}
                    fullWidth
                    // onChange={(event) => this.setState({password: event.target.value})}
                    name="password"
                    onChange={this.handleChange}
                    noValidate
                    defaultValue={password}
                    margin="normal"
                    className="mt-0 mb-3 my-sm-3"
                  />
                  {/* {errors.password.length > 0 && 
                <span className='error'>{errors.password}</span>} */}
                  <div className="mb-3 mt-2 d-flex align-items-center justify-content-center">
                    <Button
                      onClick={event => {
                        this.handleSubmit(event);
                      }}
                      variant="contained"
                      color="primary"
                      disabled={this.state.disabled}
                    >
                      <IntlMessages id="appModule.signIn" />
                    </Button>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
        <InfoView />
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return { authUser };
};

export default connect(mapStateToProps, { awsUserSignIn })(SignIn);
