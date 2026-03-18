import { IsString, IsUUID, Length, Validate } from 'class-validator';
import { NoLeadingTrailingSpaces } from 'src/ValidationDecorators/trim-string.validator';

export class CreatePostDto {
  @IsString()
  @Length(3, 30)
  @Validate(NoLeadingTrailingSpaces)
  title: string;

  @IsString()
  @Length(1, 500)
  content: string;

  @IsUUID()
  blogId: string;
}
