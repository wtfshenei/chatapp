import React from 'react';
import SendImg from '../../assets/img/img.png'
import SendAttach from '../../assets/img/attach.png'

const Input = () => {
    return (
        <div className={'input'}>
           <input type={'text'} placeholder={'Type something...'} />
            <div className={"send"}>
                <img src={SendAttach} alt={'Attach'} />
                <input type={'file'} id={'file'} style={{display: 'none'}} />
                <label htmlFor={'file'}>
                    <img src={SendImg} alt={'Send Image'} />
                </label>
                <button>Send</button>
            </div>
        </div>
    );
};

export default Input;