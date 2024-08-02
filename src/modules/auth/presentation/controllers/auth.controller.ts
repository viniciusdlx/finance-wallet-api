import {
    Body,
    Controller,
    Get,
    HttpStatus,
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
    ApiOkResponse,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/config/guards/jwt-auth.guard';
import { AuthService } from '../../application/services/auth.service';
import { UserAuthRequest } from '../../domain/interfaces/user-auth.request.interface';
import { AccessTokenDto } from '../dtos/access-token.dto';
import { AuthOutputDto } from '../dtos/auth-output.dto';
import { CreateAuthDto } from '../dtos/create-auth.dto';
import { LoginUserDto } from '../dtos/login-user.dto';
import { UpdateAuthDto } from '../dtos/update-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    @ApiBody({ type: CreateAuthDto })
    @ApiOkResponse({ description: 'Success' })
    @ApiResponse({ type: AuthOutputDto })
    async register(@Body() body: CreateAuthDto, @Res() res: Response) {
        const auth = await this.authService.create(body);
        return res.status(HttpStatus.CREATED).json(auth);
    }

    @Post('login')
    @ApiBody({ type: LoginUserDto })
    @ApiOkResponse({ description: 'Success' })
    @ApiResponse({ type: AccessTokenDto })
    async login(@Body() body: LoginUserDto, @Res() res: Response) {
        const accessToken = await this.authService.login(body);
        return res.status(HttpStatus.OK).json(accessToken);
    }

    @Get()
    @ApiOkResponse({ description: 'Success' })
    @ApiResponse({ type: AuthOutputDto, isArray: true })
    async findAll(@Res() res: Response) {
        const auths = await this.authService.findAll();
        return res.status(HttpStatus.OK).json(auths);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth() // Nome da configuração de segurança
    @Get('guard')
    async guard(@Req() req: UserAuthRequest, @Res() res: Response) {
        return res.status(HttpStatus.OK).json({
            content: req.user,
        });
    }

    @Put(':id')
    @ApiParam({ name: 'id' })
    @ApiBody({ type: UpdateAuthDto })
    async update(
        @Param('id') id: string,
        @Body() body: UpdateAuthDto,
        @Res() res: Response,
    ) {
        await this.authService.update(id, body);
        return res.status(HttpStatus.NO_CONTENT);
    }
}
