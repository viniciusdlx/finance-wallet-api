import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}
