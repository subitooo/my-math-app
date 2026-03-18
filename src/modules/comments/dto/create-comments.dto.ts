import { IsString, IsUUID, Length, Validate } from 'class-validator';
import { NoLeadingTrailingSpaces } from 'src/ValidationDecorators/trim-string.validator';

export class CreateCommentDto {
  @Length(1, 50)
  @IsString()
  @Validate(NoLeadingTrailingSpaces)
  content: string;

  @IsUUID()
  postId: string;
}
