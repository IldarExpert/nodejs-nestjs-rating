import { IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  name: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @Max(5, { message: 'Рэйтинг не может больше 5' })
  @Min(1, { message: 'Рэйтинг не может меньше 1' })
  @IsNumber()
  rating: number;

  @IsString()
  productId: string;
}
