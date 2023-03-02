import { useEffect } from "react";
import Router from "next/router";
import nextCookie from "next-cookies";
import Cookie from "js-cookie";

export const login = ({ token }: { token: string }): void => {
	Cookie.set("token", token, { expires: 30 });
	Router.push("/dashboard");
};

export const auth = (ctx: any): string => {
	const { token } = nextCookie(ctx);

	// If there's no token, it means the user is not logged in.
	if (!token) {
		if (typeof window === "undefined") {
			ctx.res.writeHead(302, { Location: "/auth/login" });
			ctx.res.end();
		} else {
			Router.push("/auth/login");
		}
	}

	return token as string;
};

export const logout = (): void => {
	Cookie.remove("token");
	Cookie.remove("invitation_id");
	// to support logging out from all windows
	window.localStorage.setItem("logout", Date.now().toString());
	Router.push("/auth/login");
};

export const protectedRoute = (WrappedComponent: any): any => {
	const Wrapper = (props: any) => {
		const syncLogout = (event: StorageEvent) => {
			if (event.key === "logout") {
				console.log("logged out from storage!");
				Router.push("/auth/login");
			}
		};

		useEffect(() => {
			window.addEventListener("storage", syncLogout);

			return () => {
				window.removeEventListener("storage", syncLogout);
				window.localStorage.removeItem("logout");
			};
		}, []);

		return <WrappedComponent {...props} />;
	};

	Wrapper.getInitialProps = async (ctx: any) => {
		const token = auth(ctx);

		const componentProps =
			WrappedComponent.getInitialProps &&
			(await WrappedComponent.getInitialProps(ctx));

		return { ...componentProps, token };
	};

	return Wrapper;
};
