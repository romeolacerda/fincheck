import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { createContext, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LaunchScreen } from "../../components/LaunchScreen";
import { localStorageKeys } from "../config/LocalStorageKeys";
import { usersService } from "../services/usersService";

interface AuthContextValue {
    signedIn: boolean;
    signin(accessToken: string): void;
    signout(): void;
}

export const AuthContext = createContext<AuthContextValue>(
    {} as AuthContextValue
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [signedIn, setSignedIn] = useState<boolean>(() => {
        const storedAccessKeys = localStorage.getItem(
            localStorageKeys.ACCESS_TOKEN
        );

        return !!storedAccessKeys;
    });

    const queryClient = useQueryClient()

    const { isError, isFetching, isSuccess } = useQuery({
        queryKey: ["users", "me"],
        queryFn: async () => usersService.me(),
        enabled: signedIn,
        staleTime: Infinity,
    });

    const signin = useCallback((accessToken: string) => {
        localStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
        setSignedIn(true);
    }, []);

    const signout = useCallback(() => {
        localStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
        queryClient.removeQueries({ queryKey: ["users", "me"]})
        setSignedIn(false);
    }, []);

    useEffect(() => {
        if (isError) {
            signout();
            toast.error("Your session has expired");
        }
    }, [isError, signout]);


    return (
        <AuthContext.Provider value={{ signedIn: isSuccess && signedIn, signin, signout }}>
            <LaunchScreen isLoading={isFetching}/>
            {!isFetching && children}
        </AuthContext.Provider>
    );
}
