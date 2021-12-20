import React from 'react';
import style from './index.module.css'
import Close from '@material-ui/icons/close'

interface Props {
    children: any;
    spinner: boolean;
    closeModule: () => void
}

const popup: React.FC<Props> = (props) => {
    return (
        <div className={style.Popup}>
            <div className={style.ContentContainer}>
                <div className={`${style.Content} ${props.spinner && style.SpinnerContent}`}>
                    <i className={style.ModalCloseBtn} onClick={props.closeModule}><Close /></i>
                    {props.children}
                </div>
            </div>

            <div onClick={props.closeModule} className={style.moduleBackground}>

            </div>
        </div>
    );
};

export default popup;