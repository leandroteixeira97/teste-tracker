import { AuthenticationService } from '@/services/AuthenticationService';
import Router from 'next/router';

export class RequestHelper {
    private static serverURL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL;

    public static async get<T>(path: string): Promise<T | undefined> {
        const response: Response = await fetch(RequestHelper.sanitizePath(path), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + AuthenticationService.getAccessToken(),
            },
        });

        return await this.returnOrRedirect(response);
    }

    public static async post<T>(path: string, body: object): Promise<T | undefined> {
        const response: Response = await fetch(RequestHelper.sanitizePath(path), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + AuthenticationService.getAccessToken(),
            },
            body: JSON.stringify(body),
        });

        return await this.returnOrRedirect(response);
    }

    private static sanitizePath(path: string): string {
        if (this.serverURL) {
            if (!path.startsWith(this.serverURL)) {
                if (!path.startsWith('/')) {
                    path = '/' + path;
                }

                path = this.serverURL + path;
            }
        }

        return path;
    }

    private static async returnOrRedirect<T>(response: Response): Promise<T | undefined> {
        if (response.status >= 200 && response.status < 400) {
            const body = await response.json();
            return body as T;
        }

        if (response.status === 401) {
            Router.push('/login');
        } else {
            throw new Error('An error occured when performing the request');
        }
    }
}
