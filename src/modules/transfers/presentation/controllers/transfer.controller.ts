import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Inject,
    Param,
    Post,
    Put,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBody,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/config/guards/jwt-auth.guard';
import { UserAuthRequest } from 'src/modules/auth/domain/interfaces/user-auth.request.interface';
import { ITransferService } from '../../domain/interfaces/transfer-service.interface';
import { TransferAmountDto } from '../dtos/transfer-amount.dto';
import { TransferOutputDto } from '../dtos/transfer-output.dto';

@ApiTags('Transfers')
@Controller('transfers')
export class TransferController {
    constructor(
        @Inject('ITransferService')
        private readonly transferService: ITransferService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post()
    @ApiBody({ type: TransferAmountDto })
    @ApiResponse({ type: TransferOutputDto, isArray: false })
    async create(@Body() body: TransferAmountDto, @Res() res: Response) {
        const transfer = await this.transferService.transferAmount({
            ...body,
        });

        return res.status(HttpStatus.CREATED).json(transfer);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('user')
    @ApiResponse({ type: TransferOutputDto, isArray: true })
    async getByUserId(@Res() res: Response, @Req() req: UserAuthRequest) {
        const transfers = await this.transferService.findByUserId(req.user.sub);
        return res.status(HttpStatus.OK).json(transfers);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put(':id')
    @ApiParam({ name: 'id' })
    async cancelTransfer(@Param('id') id: string, @Res() res: Response) {
        await this.transferService.cancelTransfer(id);
        return res.status(HttpStatus.NO_CONTENT).json();
    }
}
