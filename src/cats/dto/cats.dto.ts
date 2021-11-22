import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: 'id',
    description: 'id',
    required: true,
  })
  id: string;
}

/**
 * PickType
 * - Cat schema 의 값을 상속받을때 모든값이 아닌 특정값을 상속 받고 싶을때 사용
 * PickType(T, [T keyof K] as const)
 * Omit , Pick, Patila 등등 있음.
 */
