import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from 'src/config/env';
import { UserPayloadDto } from '../../presentation/dtos/user-payload.dto';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt-user') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: UserPayloadDto): Promise<UserPayloadDto> {
        if (!payload) {
            throw new UnauthorizedException();
        }

        return payload;
    }
}
