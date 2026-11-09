import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ParceirosService } from './parceiros.service';
import { CreateParceiroDto } from './dto/create-parceiro.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RhGuard } from '../auth/rh.guard';

@Controller('parceiros')
export class ParceirosController {
  constructor(
    @Inject(ParceirosService)
    private readonly parceirosService: ParceirosService,
  ) {}

  @Post()
  async create(@Body() body: CreateParceiroDto) {
    return this.parceirosService.create(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RhGuard)
  async findAll() {
    return this.parceirosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.parceirosService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RhGuard)
  async remove(@Param('id') id: string) {
    return this.parceirosService.remove(id);
  }
}
