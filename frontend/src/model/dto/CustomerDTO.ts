import { AttendanceDTO } from './AttendanceDTO';

export interface CustomerDTO {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  createdAt?: string | Date;
  attendances: AttendanceDTO[];
}