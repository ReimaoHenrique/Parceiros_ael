import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateParceiroDto } from './dto/create-parceiro.dto';

@Injectable()
export class ParceirosService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async create(data: CreateParceiroDto) {
    return this.prisma.client.parceiro.create({
      data: {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        area: data.area,
        cidade: data.cidade,
        linkedin: data.linkedin,
        mensagem: data.mensagem,
      },
    });
  }

  async findOne(id: string) {
    const parceiroId = Number(id);
    if (Number.isNaN(parceiroId)) {
      throw new BadRequestException('Invalid parceiro id');
    }

    const parceiro = await this.prisma.client.parceiro.findUnique({
      where: { id: parceiroId },
    });

    if (!parceiro) {
      throw new NotFoundException('Parceiro not found');
    }

    return parceiro;
  }
}
