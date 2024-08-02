import { ApiProperty } from '@nestjs/swagger';

export class FindByGuid {
    @ApiProperty()
    id: string;
}
