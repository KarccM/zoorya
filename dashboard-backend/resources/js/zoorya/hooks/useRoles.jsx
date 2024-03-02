import { useAuth } from "../context/auth-context";

export default function useRoles() {
    const { user } = useAuth();

    const userCan = (permission) => {
        if (!user) return false;
        return user.permissions.includes(permission);
    };

    return { userCan };
}
