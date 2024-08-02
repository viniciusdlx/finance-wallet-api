import { ApiProperty } from '@nestjs/swagger';
import dayjs from 'dayjs';

export class CreateUserDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    name: string;

    @ApiProperty({
        type: Number,
        default: dayjs().format('YYYY-MM-DD'),
    })
    birthDate: Date;
}
