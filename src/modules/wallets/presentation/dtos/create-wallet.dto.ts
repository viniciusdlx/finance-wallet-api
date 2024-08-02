import { ApiProperty } from '@nestjs/swagger';

export class CreateWalletDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    userId: string;
}
