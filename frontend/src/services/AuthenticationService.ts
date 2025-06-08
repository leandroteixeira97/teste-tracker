import { LocalStorageHelper } from '@/helpers/LocalStorageHelper';
import { RequestHelper } from '@/helpers/RequestHelper';
import { AuthReponse } from '@/model/AuthResponse';
import { LoginDTO } from '@/model/dto/LoginDTO';

export class AuthenticationService {
    private static ACCESS_TOKEN_KEY_NAME = 'access_token';

    public static getAccessToken(): string | null {
        return LocalStorageHelper.getItem(AuthenticationService.ACCESS_TOKEN_KEY_NAME);
    }

    public static async performLogin(email: string, password: string): Promise<void> {
        const loginDTO: LoginDTO = { email: email, passwordHash: password };
        try {
            const response: AuthReponse | undefined = await RequestHelper.post('/auth/login', loginDTO);

            if (!response) {
                throw new Error('The auth response is undefined');
            }

            LocalStorageHelper.setItem(AuthenticationService.ACCESS_TOKEN_KEY_NAME, response.access_token);
        } catch (e) {
            LocalStorageHelper.removeItem(AuthenticationService.ACCESS_TOKEN_KEY_NAME);
            throw e;
        }
    }

    public static performLogout(): void {
        LocalStorageHelper.removeItem(AuthenticationService.ACCESS_TOKEN_KEY_NAME);
    }
}
