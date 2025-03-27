
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MachinesService } from './machines.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateMachineDto } from './dto/update-machine.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('machines')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('machines')
export class MachinesController {
  constructor(private machinesService: MachinesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all machines' })
  @ApiResponse({ status: 200, description: 'Return all machines' })
  getAllMachines() {
    return this.machinesService.getAllMachines();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a machine by ID' })
  @ApiResponse({ status: 200, description: 'Return a machine by ID' })
  @ApiResponse({ status: 404, description: 'Machine not found' })
  getMachineById(@Param('id') id: string) {
    return this.machinesService.getMachineById(+id);
  }

  @Post(':id/update')
  @ApiOperation({ summary: 'Update a machine' })
  @ApiResponse({ status: 200, description: 'Machine updated successfully' })
  @ApiResponse({ status: 404, description: 'Machine not found' })
  updateMachine(
    @Param('id') id: string,
    @Body() updateMachineDto: UpdateMachineDto,
  ) {
    return this.machinesService.updateMachine(+id, updateMachineDto);
  }
}
