import { useDispatch } from "react-redux";
import { router } from "../../../app/app.routes";
import { clearError, setError, setLoading, setUser } from "../auth.slice";
import { getMe, login, logout, register } from "../service/auth.api";

export function useAuth() {
    const dispatch = useDispatch();

    async function handleRegister({ email, username, password }) {
        try {
            dispatch(clearError());
            dispatch(setLoading(true));
            const data = await register({ email, username, password });
            return data;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Registration failed"));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLogin({ email, password }) {
        try {
            dispatch(clearError());
            dispatch(setLoading(true));
            const data = await login({ email, password });
            dispatch(setUser(data.data.user));
            return data;
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Login failed"));
            throw error;
        } finally {
            dispatch(setLoading(false));
        }
    }

    async function handleLogout() {
        try {
            dispatch(clearError());
            dispatch(setLoading(true));
            await logout();
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Logout failed"));
            throw error;
        } finally {
            dispatch(setUser(null));
            dispatch(setLoading(false));
            router.navigate("/login");
        }
    }

    async function handleGetMe() {
        try {
            dispatch(clearError());
            dispatch(setLoading(true));
            const data = await getMe();
            dispatch(setUser(data.data.user));
        } catch {
            dispatch(setUser(null));
        } finally {
            dispatch(setLoading(false));
        }
    }

    return {
        handleRegister,
        handleLogin,
        handleLogout,
        handleGetMe,
    };
}
