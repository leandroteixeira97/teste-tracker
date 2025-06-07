import { AuthenticationService } from "@/services/AuthenticationService";

export class RequestHelper {
    private static serverURL: string | undefined = process.env.NEXT_PUBLIC_BACKEND_URL;

    public static async get(path: string): Promise<JSON> {
        const response: Response = await fetch(RequestHelper.sanitizePath(path), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + AuthenticationService.getAccessToken()
            }
        });

        if (response.status >= 200 && response.status < 400) {
            return await response.json();
        }

        throw new Error('An error occured when performing the request');
    }

    public static async post(path: string, body: object): Promise<JSON> {
        const response: Response = await fetch(RequestHelper.sanitizePath(path), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + AuthenticationService.getAccessToken()
            },
            body: JSON.stringify(body),
        });

        if (response.status >= 200 && response.status < 400) {
            return await response.json();
        }

        throw new Error('An error occured when performing the request');
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
}
