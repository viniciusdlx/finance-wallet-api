import { ApiProperty } from '@nestjs/swagger';
import { TransferStatusEnum } from '../../domain/enums/transfer-status.enum';

export class TransferOutputDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    fromUserWalletId: string;

    @ApiProperty()
    toUserWalletId: string;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    transferDate: Date;

    @ApiProperty()
    transferHour: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    status: TransferStatusEnum;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
