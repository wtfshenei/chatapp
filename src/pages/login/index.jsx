import React from 'react';

const Index = () => {
    return (
        <div className={'form-container'}>
            <div className={'form-wrapper'}>
                <span className={'logo'}>FFT Chat</span>
                <span className={'title'}>Login</span>
                <form>
                    <input type={'text'} placeholder={'Display Name'} />
                    <input type={'email'} placeholder={'Email'} />
                    <button>Sign In</button>
                </form>
                <p>You don't have an account ? Register</p>
            </div>
        </div>
    );
};

export default Index;