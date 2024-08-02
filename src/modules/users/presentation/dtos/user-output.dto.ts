import { ApiProperty } from '@nestjs/swagger';

export class UserOutputDto {
    @ApiProperty()
    id?: string;

    @ApiProperty()
    email?: string;

    @ApiProperty()
    name?: string;

    @ApiProperty()
    birthDate?: Date;

    @ApiProperty()
    createdAt?: Date;

    @ApiProperty()
    updatedAt?: Date;
}
