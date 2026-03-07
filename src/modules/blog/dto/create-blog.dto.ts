import { IsOptional, IsString, Length, Matches } from 'class-validator';
import { Transform } from 'class-transformer';


export class CreateBlogDto {

  @IsString()
  @Length(3, 15)
  @Matches(/^[\p{L}]+(?: [\p{L}]+)*$/u, {
  message: 'Название должно содержать только буквы и пробелы между словами'
})
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}
