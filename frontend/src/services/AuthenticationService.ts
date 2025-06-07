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
            const response: AuthReponse = (await RequestHelper.post('/auth/login', loginDTO)) as unknown as AuthReponse;
            LocalStorageHelper.setItem(AuthenticationService.ACCESS_TOKEN_KEY_NAME, response.access_token);
        } catch (e) {
            LocalStorageHelper.removeItem(AuthenticationService.ACCESS_TOKEN_KEY_NAME);
            throw e;
        }
    }

    public static performLogout(): void {
        LocalStorageHelper.removeItem(AuthenticationService.ACCESS_TOKEN_KEY_NAME);
    } 

    public static async isTokenValid(): Promise<boolean> {
        try {
            await RequestHelper.get('/auth/isTokenValid');
            return true;
        } catch {
            return false;
        }
    }
}
