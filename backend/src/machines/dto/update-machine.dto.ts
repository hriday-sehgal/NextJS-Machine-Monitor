
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export class UpdateMachineDto {
  @ApiProperty({ enum: ['Running', 'Idle', 'Stopped'], required: false })
  @IsEnum(['Running', 'Idle', 'Stopped'])
  @IsOptional()
  status?: 'Running' | 'Idle' | 'Stopped';

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  temperature?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  energyConsumption?: number;
}
