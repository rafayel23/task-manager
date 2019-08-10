import { Status } from './status.enum';

export interface FilterTerms {
    exactDate: Date;
    minDate: Date;
    maxDate: Date;
    status: Status;
    placeName: string,
    address: string,
}