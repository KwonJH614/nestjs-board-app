import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCreateDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username : string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  // 영어와 숫자만 허용하는 유효성 체크
  @Matches(/^[a-zA-Z0-9]*$/, {
    message : 'password only accepts english and number'
  })
  password : string;
}