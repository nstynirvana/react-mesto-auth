import React from 'react';
import AuthorizeForm from './AuthorizeForm';

function Login(props) {

    return (
        <section className='authorize'>
            <AuthorizeForm title={props.title} onSubmit={props.onLogin} textOfButton={props.textOfButton} />
        </section>
    );
}

export default Login