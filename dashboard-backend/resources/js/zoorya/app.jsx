import * as React from "react";
import { useAuth } from "./context/auth-context";
// theme
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
// components
import { I18nProvider } from "./utils/i18n";
import { RecoilRoot } from "recoil";
import AuthenticatedApp from "./authenticated-app";
import UnauthenticatedApp from "./unauthenticated-app";
import { FullPageSpinner } from "./components/lib";

import axios from "axios";
import errorHandler from './utils/error-handler';

axios.defaults.baseURL = `${window.origin}/api/admin`;
axios.interceptors.response.use(
    (response) => response.data,
    async (error) => await errorHandler(error)
);

function App() {
    const { user } = useAuth();
    return (
        <RecoilRoot>
            <ThemeConfig>
                <I18nProvider>
                    <GlobalStyles />
                    <React.Suspense fallback={<FullPageSpinner />}>
                        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
                    </React.Suspense>
                </I18nProvider>
            </ThemeConfig>
        </RecoilRoot>
    );
}
export default App;
