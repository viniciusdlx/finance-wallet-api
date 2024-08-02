import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Inject,
    Param,
    Post,
    Res,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { IUserService } from '../../domain/interfaces/user-service.interface';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserOutputDto } from './../dtos/user-output.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(
        @Inject('IUserService')
        private readonly userService: IUserService,
    ) {}

    @Post()
    @ApiCreatedResponse({
        description: 'Usuário cadastrado com sucesso.',
    })
    @ApiBadRequestResponse()
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({ type: UserOutputDto })
    async create(@Body() body: CreateUserDto, @Res() res: Response) {
        const user = await this.userService.create(body);
        return res.status(HttpStatus.CREATED).json(user);
    }

    @Get()
    @ApiOkResponse({ description: 'Success' })
    @ApiResponse({ type: UserOutputDto, isArray: true })
    async getAll(@Res() res: Response) {
        const users = await this.userService.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @Get(':id')
    @ApiParam({ name: 'id' })
    @ApiOkResponse({ description: 'Success' })
    @ApiBadRequestResponse({ description: 'Usuário não encontrado' })
    @ApiResponse({ type: UserOutputDto })
    async getById(@Param('id') id: string, @Res() res: Response) {
        const user = await this.userService.findOneById(id);
        return res.status(HttpStatus.OK).json(user);
    }
}
