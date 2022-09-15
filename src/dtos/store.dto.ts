import { IsArray, IsBoolean, IsString } from 'class-validator';

export class StoreDto {
  @IsArray()
  public files: StoreFile[];
}

class StoreFile {
  @IsString()
  name: string;
  @IsBoolean()
  dir: boolean;
  @IsString()
  date: string;
}
