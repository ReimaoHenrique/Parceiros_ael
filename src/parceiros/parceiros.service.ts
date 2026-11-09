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

  async findAll() {
    return this.prisma.client.parceiro.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const parceiroId = this.parseId(id);

    const parceiro = await this.prisma.client.parceiro.findUnique({
      where: { id: parceiroId },
    });

    if (!parceiro) {
      throw new NotFoundException('Parceiro not found');
    }

    return parceiro;
  }

  async remove(id: string) {
    const parceiroId = this.parseId(id);

    const parceiro = await this.prisma.client.parceiro.findUnique({
      where: { id: parceiroId },
    });

    if (!parceiro) {
      throw new NotFoundException('Parceiro not found');
    }

    await this.prisma.client.parceiro.delete({
      where: { id: parceiroId },
    });

    return { message: 'Parceiro deleted', id: parceiroId };
  }

  private parseId(id: string): number {
    const parceiroId = Number(id);

    if (!Number.isInteger(parceiroId) || parceiroId <= 0) {
      throw new BadRequestException('Invalid parceiro id');
    }

    return parceiroId;
  }
}
