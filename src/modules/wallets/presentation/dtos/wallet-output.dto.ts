import { ApiProperty } from '@nestjs/swagger';
import { WalletStatusEnum } from '../../domain/enums/wallet-status.enum';

export class WalletOutputDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    balance: number | string;

    @ApiProperty({ enum: WalletStatusEnum })
    status: WalletStatusEnum;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    userId: string;
}
