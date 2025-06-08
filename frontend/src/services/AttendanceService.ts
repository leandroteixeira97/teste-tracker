import { RequestHelper } from '@/helpers/RequestHelper';
import { CreateAttendanceDTO } from '@/model/dto/CreateAttendanceDTO';

export class AttendanceService {
    public static async createAttendance(customerId: string, description: string): Promise<void> {
        const createAttendanceDTO: CreateAttendanceDTO = {
            customerId: customerId,
            description: description,
        };

        await RequestHelper.post('/attendances', createAttendanceDTO);
    }
}
