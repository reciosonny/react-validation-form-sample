import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

const txtFieldState = {
    value: "",
    valid: false,
    typeMismatch: false,
    hasRegexValidation: false,
    regexFormat: "**insert regex format here**"
};

class App extends Component {
    state = {
        txtEmail: { ...txtFieldState, fieldName: "Email" },
        txtFname: { ...txtFieldState, fieldName: "First Name" },
        txtLname: { ...txtFieldState, fieldName: "Last Name" }
    };

    onSubmit = e => {
        /*TODO: take a look at this link for HTML5 API validation info: 
            - https://www.sitepoint.com/html5-forms-javascript-constraint-validation-api/
            - https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation
            - https://css-tricks.com/form-validation-part-2-constraint-validation-api-javascript/
        */

        e.preventDefault();
        const form = e.target;
        const arrElements = Array.prototype.slice.call(form.elements);
        const formValues = arrElements
            .filter(elem => elem.name.length > 0)
            .map(x => {
                const { typeMismatch } = x.validity;
                const { name, type, value } = x;
                // x.setCustomValidity("validation error");

                return {
                    name,
                    type,
                    typeMismatch, //we use typeMismatch when format is incorrect(e.g. incorrect email)
                    value,
                    valid: x.checkValidity()
                };
            })
            .reduce((acc, currVal) => {
                const { value, valid, typeMismatch } = currVal;
                const {
                    fieldName,
                    hasRegexValidation,
                    regexFormat
                } = this.state[currVal.name]; //get the rest of properties inside the state object

                acc[currVal.name] = {
                    value,
                    valid,
                    typeMismatch,
                    fieldName,
                    hasRegexValidation,
                    regexFormat
                };

                return acc;
            }, {});

        // const

        this.setState({ ...formValues });
    };

    checkAllFieldsValid = () => {
        return !Object.keys(this.state)
            .map(x => this.state[x])
            .some(field => !field.valid);
    };

    render() {
        const { txtEmail, txtFname, txtLname } = this.state;
        const checkIfValid = this.checkAllFieldsValid();
        const successFormDisplay = checkIfValid ? "block" : "none";
        const inputFormDisplay = !checkIfValid ? "block" : "none";


        const renderEmailValidationError = txtEmail.valid ? (
            ""
        ) : (
            <label htmlFor="" style={{ color: "red" }}>
                {txtEmail.typeMismatch
                    ? "Incorrect email format"
                    : "Email is required"}
            </label>
        );
        const renderDateValidationError = txtLname.valid ? (
            ""
        ) : (
            <label htmlFor="" style={{ color: "red" }}>
                Last name is required
            </label>
        );

        const renderFnameValidationError = txtFname.valid ? (
            ""
        ) : (
            <label htmlFor="" style={{ color: "red" }}>
                First name is required
            </label>
        );

        return (
            <>
                <div style={{display: successFormDisplay}}>
                    <h1 style={{ textAlign: "center" }}>Success!</h1>
                    <p style={{ textAlign: "center" }}>
                        You have successfully submitted a form.
                    </p>
                </div>

                <div className="form-input" style={{display: inputFormDisplay}}>
                    <h1 style={{ textAlign: "center" }}>
                        React / HTML5 Form Validation
                    </h1>
                    <form
                        className="form-inside-input"
                        onSubmit={this.onSubmit}
                        noValidate
                    >
                        <input
                            type="email"
                            name="txtEmail"
                            placeholder="Email"
                            required
                        />
                        <br />
                        {renderEmailValidationError}
                        <br />
                        <input
                            type="text"
                            name="txtFname"
                            placeholder="First Name"
                            required
                        />
                        <br />
                        {renderFnameValidationError}
                        <br />
                        <input
                            type="text"
                            name="txtLname"
                            placeholder="Last Name"
                            required
                        />
                        <br />
                        {renderDateValidationError}
                        <br />

                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </>
        );
    }
}

export default App;
