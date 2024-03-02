import React from "react";
import { ToastContainer, toast } from "react-toastify";
import useLang from "./hooks/useLang";
import { useTheme } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import useRouter from "./routes";
import "react-toastify/dist/ReactToastify.css";

function AuthenticatedApp() {
    const { lang } = useLang();
    const { palette } = useTheme();
    const Router = useRouter();
    return (
        <>
            <RouterProvider router={Router} />
            <ToastContainer
                position={lang === "ar" ? 'bottom-left' : 'bottom-right'}
                theme={palette?.mode}
            />
        </>
    );
}

export default AuthenticatedApp;
