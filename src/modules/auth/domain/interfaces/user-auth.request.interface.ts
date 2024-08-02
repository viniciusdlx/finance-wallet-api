import { Request } from 'express';
import { UserPayloadDto } from '../../presentation/dtos/user-payload.dto';

export interface UserAuthRequest extends Request {
    user: UserPayloadDto;
}
