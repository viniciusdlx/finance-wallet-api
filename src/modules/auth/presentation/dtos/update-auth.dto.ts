import { ApiProperty } from '@nestjs/swagger';

export class UpdateAuthDto {
    @ApiProperty()
    password: string;
}
