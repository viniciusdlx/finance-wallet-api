import { ApiProperty } from '@nestjs/swagger';
import { TransferStatusEnum } from '../../domain/enums/transfer-status.enum';

export class TransferAmountDto {
    @ApiProperty()
    fromUserWalletId: string;

    @ApiProperty()
    toUserWalletId: string;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    description?: string;

    // @ApiProperty()
    status?: TransferStatusEnum;
}
