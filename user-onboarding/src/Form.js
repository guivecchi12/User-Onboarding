import React, { useState } from 'react';
import * as yup from "yup";
import axios from "axios";


const formSchema = yup.object().shape({
    name: yup
        .string()
        .required("Name is a required field"),
    email: yup
        .string()
        .email("Must be a valid email address")
        .required("Must include an email address"),
    password: yup
        .string()
        .min(6, "Passords must be at least 6 characters long.")
        .required("Must include a password"),
    terms: yup
        .boolean()
        .oneOf([false], "Please agree to the Terms of Service")

})

export default function Form(){
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        terms: false
    });

    const [errorState, setErrorState] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    });

    let [user, setUser] = useState([]);

    const validate = e => {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrorState({
                    ...errorState,
                    [e.target.name]:""
                }); 
            })
            .catch(err => {
                console.log(err.errors);
                setErrorState({
                    ...errorState,
                    [e.target.name]: err.errors[0]
                });
            });
    };

    const inputInfo = e => {
        e.persist();
        validate(e);
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setForm({...form, [e.target.name]:value});
    };

    const formSubmit = (e) =>{
        e.preventDefault();
        console.log("form submitted!");
        axios
            .post("https://reqres.in/api/users", form)
            .then(response=> {
                console.log(response);
            })
            .catch(err=> console.log(err));
        setUser(old=>[...old, form]);
    }
    return(
        <div className="form">
            <form onSubmit={formSubmit}>
                <label htmlFor="name">
                    Name 
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value = {form.name}
                        onChange={inputInfo}
                    />
                    {errorState.name.length > 0 ? (<p className="error">{errorState.name}</p>) : null}
                </label>
                <label htmlFor="email">
                    Email 
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value = {form.email}
                        onChange={inputInfo}
                    />
                    {errorState.email.length > 0 ? (<p className="error">{errorState.email}</p>) : null}
                </label>
                <label htmlFor="password">
                    Password
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value = {form.password}
                        onChange={inputInfo}
                    />
                    {errorState.password.length > 0 ? (<p className="error">{errorState.password}</p>) : null}
                </label>
                <label htmlFor="terms">
                     Terms of Service
                     <input
                        type="checkbox"
                        name="terms"
                        id="terms"
                        value = {form.terms}
                        onChange={inputInfo}
                     />
                     {errorState.terms !== true ? (<p className="error">{errorState.terms}</p>) : null}
                </label>
                <button>Submit</button>
            </form>
            <div className="user">
                <h3>Users:</h3>
                <section>
                    <div>
                        {user.map((entry)=>{
                            return (<pre>{entry.name}</pre>);
                        })}
                    </div>
                </section>
            </div>     
        </div>
    );
}