import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ParceirosService } from './parceiros.service';
import { CreateParceiroDto } from './dto/create-parceiro.dto';

@Controller('parceiros')
export class ParceirosController {
  constructor(
    @Inject(ParceirosService)
    private readonly parceirosService: ParceirosService,
  ) {
    this.create = this.create.bind(this);
    this.findOne = this.findOne.bind(this);
  }

  @Post()
  async create(@Body() body: CreateParceiroDto) {
    return this.parceirosService.create(body);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.parceirosService.findOne(id);
  }
}
