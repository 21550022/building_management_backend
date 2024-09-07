import { IsString, IsEmail, IsNotEmpty, IsPhoneNumber, IsInt, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsPhoneNumber('VN')
  @IsNotEmpty()
  readonly phone: string;

  @IsInt()
  @Min(0)
  readonly age: number;
}