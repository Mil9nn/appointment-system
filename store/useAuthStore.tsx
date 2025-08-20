import { Models } from "appwrite";
import { create } from "zustand"

interface AuthState {
    loggedInUser: Models.User<Models.Preferences> | null;
    name: string | null;
    email: string | null;
    password: string | null;
    setName: (name: string | null) => void;
    setLoggedInUser: (user: Models.User<Models.Preferences> | null) => void;
    setEmail: (email: string | null) => void;
    setPassword: (password: string | null) => void;
}

export const  useAuthStore = create<AuthState>((set) => ({
    loggedInUser: null,
    name: null,
    email: null,
    password: null,

    setName: (name) => set({ name }),
    setLoggedInUser: (loggedInUser) => set({ loggedInUser }),
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
}));