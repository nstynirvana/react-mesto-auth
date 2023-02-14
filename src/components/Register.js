import React from "react";
import {Link, useNavigate} from 'react-router-dom'
import AuthorizeForm from "./AuthorizeForm";

function Register(props) {

  return (
    <section className="authorize">
       {/* onSubmit={props.?} */}
      <AuthorizeForm title={props.title} textOfButton={props.textOfButton}/>
      <div className="authorize__container">
        <p className="authorize__text">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="authorize__link link">Войти</Link>
      </div>
    </section>
  )
}

export default Register