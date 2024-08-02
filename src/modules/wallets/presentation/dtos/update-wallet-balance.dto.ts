import { ApiProperty } from '@nestjs/swagger';

export class UpdateWalletBalanceDto {
    @ApiProperty()
    addBalance?: number;

    @ApiProperty()
    removeBalance?: number;
}
