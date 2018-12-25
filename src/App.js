import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
    state = { txtEmail: {value:"", valid:false}, txtFname: {value:"", valid:false} };

    render() {
        return (
            <div>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        const form = e.target;
                        const arrElements = Array.prototype.slice.call(form.elements);
                        const formValues = arrElements
                            .filter(elem => elem.name.length > 0)
                            .map(x => {
                                return {
                                    name: x.name,
                                    value: x.value,
                                    valid: x.checkValidity()
                                };
                            })
                            .reduce((acc, currVal) => {
                                const { value, valid } = currVal;
                                acc[currVal.name] = { value, valid };

                                return acc;
                            }, {});
                            
                        this.setState({ ...formValues });
                    }}
                    noValidate
                >
                    <input type="email" name="txtEmail" required />
                    <input type="text" name="txtFname" required />

                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default App;
