import { useState } from "react";
import { signOut } from "next-auth/react";
import Cookies from "universal-cookie";
import ResponseType from "@/types/response/ResponseType";
import { useRouter } from "next/router";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

interface ExtraOptions {
  headers?: Record<string, string>
  contentType?: string
  noJson?: boolean
}

function useApi() {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	async function get<T>(
		url: string,
		params: Record<string, string> = {},
		extra: ExtraOptions = {}
	): Promise<ResponseType<T> | undefined> {
		const cookies = new Cookies();

		setLoading(true);
		const locale = cookies.get("default-locale") ?? "ca";
		const headers = {
			Authorization: `Bearer ${getAuthToken()}`,
			"Accept-Language": locale,
			"Content-Type": "text/html; charset=UTF-8",
			...extra.headers
		};

		if (extra && extra.contentType) {
			headers["Content-Type"] = extra.contentType;
		}

		const queryParams = new URLSearchParams(params);

		try {
			const response = await fetch(`${BACKEND_URL}${url}?${queryParams}`, {
				headers
			});
			const data = (await response.json()) as ResponseType<T>;

			if (data && (data as any).actions) {
				if ((data as any).actions.logout) {
					signOut();
				} else if ((data as any).actions.redirect_admin_index) {
					router.push("/admin");
				}
			}
			setLoading(false);
			return data;
		} catch (error) {
			console.error(`Error while fetching ${url} - ${error}`);

			setLoading(false);
		}

		setLoading(false);
		return undefined;
	}

	async function post<T>(
		url: string,
		payload: any = {},
		extra: ExtraOptions = {}
	): Promise<ResponseType<T> | undefined> {
		const cookies = new Cookies();
		setLoading(true);
		const locale = cookies.get("default-locale") ?? "es";
		const headers = {
			Authorization: `Bearer ${getAuthToken()}`,
			"Content-Type": "application/json",
			"Accept-Language": locale,
			...extra.headers
		};

		try {
			const response = await fetch(BACKEND_URL + url, {
				method: "POST",
				headers,
				body: JSON.stringify(payload)
			});

			const data = (await response.json()) as ResponseType<T>;
			//(data);

			if (data && (data as any).actions) {
				if ((data as any).actions.logout) {
					signOut();
				}
			}
			setLoading(false);
			return data;
		} catch (error) {
			setLoading(false);
			alert("Error while fetching.." + error);
		}
		setLoading(false);
		return undefined;
	}

	function getAuthToken() {
		const authCookie = document.cookie
			.split("; ")
			.find(row => row.startsWith("next-auth.session-token="));
		const authToken = authCookie ? authCookie.split("=")[1] : null;
		return authToken;
	}


	return { get, post, loading, setLoading};
}

export default useApi;
