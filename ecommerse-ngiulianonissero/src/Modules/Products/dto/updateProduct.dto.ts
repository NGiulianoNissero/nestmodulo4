import { IsBoolean, IsNumber, IsString, IsUrl } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  name?: string;

  @IsString()
  description?: string;

  @IsNumber()
  price?: number;

  @IsBoolean()
  stock?: boolean;

  @IsString()
  @IsUrl()
  imgUrl?: string;
}
