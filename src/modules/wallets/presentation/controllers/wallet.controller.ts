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
import { IWalletService } from '../../domain/interfaces/wallet-service.interface';
import { CreateWalletDto } from '../dtos/create-wallet.dto';
import { UpdateWalletBalanceDto } from '../dtos/update-wallet-balance.dto';
import { WalletOutputDto } from '../dtos/wallet-output.dto';

@ApiTags('Wallets')
@Controller('wallets')
export class WalletController {
    constructor(
        @Inject('IWalletService')
        private readonly walletService: IWalletService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post()
    @ApiBody({ type: CreateWalletDto })
    @ApiResponse({ type: WalletOutputDto, isArray: false })
    async create(
        @Body() body: CreateWalletDto,
        @Req() req: UserAuthRequest,
        @Res() res: Response,
    ) {
        const wallet = await this.walletService.create({
            ...body,
            userId: req.user.sub,
        });
        return res.status(HttpStatus.CREATED).json(wallet);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('user')
    @ApiResponse({ type: WalletOutputDto, isArray: true })
    async findByUserId(@Res() res: Response, @Req() req: UserAuthRequest) {
        const wallets = await this.walletService.findByUserId(req.user.sub);
        return res.status(HttpStatus.OK).json(wallets);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put(':id/balance')
    @ApiParam({ name: 'id' })
    @ApiBody({ type: UpdateWalletBalanceDto })
    async updateBalance(
        @Param('id') id: string,
        @Body() body: UpdateWalletBalanceDto,
        @Res() res: Response,
    ) {
        await this.walletService.updateBalance(id, body);
        return res.status(HttpStatus.NO_CONTENT).json();
    }
}
