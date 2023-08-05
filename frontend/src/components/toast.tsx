import React, { useState } from "react"
import { Toast } from "react-bootstrap";

export interface IToastOptions {
    title: string;
    description: string;
    style?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light';
    autoHide?: boolean;
    hidingDelay?: number;
}

const StatefulToast: React.FC<IToastOptions> = ({title, description, style, autoHide, hidingDelay}) => {

    const [visible, setVisible] = useState(true);

    return (
        <Toast bg={style || 'light'} autohide={autoHide || true} delay={hidingDelay || 5000} show={visible} onClose={() => setVisible(false)}>
            <Toast.Header>
                <strong className="me-auto">{title}</strong>
            </Toast.Header>
            <Toast.Body>
                {description}
            </Toast.Body>
        </Toast>
    )
};

export default StatefulToast;