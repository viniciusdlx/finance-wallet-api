import { ApiProperty } from '@nestjs/swagger';

export class UserPayloadDto {
    @ApiProperty()
    sub: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;
}
