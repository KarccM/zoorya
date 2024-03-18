import * as React from "react";
import { QueryClient, useQuery, useMutation } from 'react-query';
import { FullPageSpinner, FullPageErrorFallback } from "../components/lib";
import useLang from "../hooks/useLang";
import axios from "axios";

const AuthContext = React.createContext();
AuthContext.displayName = "AuthContext";

function AuthProvider(props) {
    const [user, setUser] = React.useState(undefined);
    const { isLoading, isError, isSuccess } = useQuery(['profile'], () => axios({ url: 'profile' }).catch(err => console.log('err :>> ', err)), {
        onSuccess: (userResponse) => setUser(userResponse?.data)
    });

    const { mutate: logout } = useMutation((data) => axios({
        url: `${window.origin}/api/logout`,
        method: 'POST',
        data,
    }),
        { onSuccess: () => setUser(undefined) }
    )

    const login = (user) => setUser(user)

    const value = React.useMemo(() => ({ user, setUser, logout, login }), [user]);

    if (isLoading) return <FullPageSpinner />

    if (isError) return <FullPageErrorFallback />

    if (isSuccess) return <AuthContext.Provider value={value} {...props} />

    return <></>
}

function useAuth() {
    const context = React.useContext(AuthContext);
    if (!context)
        throw new Error(`useAuth must be used within a AuthProvider`);
    return context;
}

function useClient(ContentType) {
    const { lang } = useLang();
    const headers = { "x-locale": lang };
    return React.useCallback((endpoint, config) => axios(endpoint, { ...config, headers }), [lang]);
}

export { AuthProvider, useAuth, useClient };
