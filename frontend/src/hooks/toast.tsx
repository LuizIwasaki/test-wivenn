import React, { createContext, useCallback, useContext, useState } from "react"
import { ToastContainer } from "react-bootstrap";
import StatefulToast, { IToastOptions } from "../components/toast";
import { IFCChildren } from "../types/i_fc_children";

interface IToastContext {
    presentToast(opt: IToastOptions): void
}

const ToastContext = createContext<IToastContext>({} as IToastContext);

const ToastProvider: React.FC<IFCChildren> = ({ children }) => {

    const [toastList, setToastList] = useState<IToastOptions[]>([]);

    const presentToast = useCallback(async (opt: IToastOptions) => {
        setToastList([...toastList, opt]);
    }, [toastList]);

    return (
        <ToastContext.Provider value={{presentToast}}>
            <div aria-live="polite" aria-atomic="true">
                <ToastContainer position="bottom-end" className="p-3">
                    {toastList.map((t, i) =>
                        <StatefulToast title={t.title} description={t.description} style={t.style} autoHide={t.autoHide} hidingDelay={t.hidingDelay} key={i} />
                    )}
                </ToastContainer>
            </div>
            { children }
        </ToastContext.Provider>
    )
}

function useToast(): IToastContext {
    return useContext(ToastContext);
}

export {
    ToastProvider, useToast
}