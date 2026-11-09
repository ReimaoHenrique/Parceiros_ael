import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateParceiroDto } from './dto/create-parceiro.dto';
import { QueryParceirosDto } from './dto/query-parceiros.dto';

const MAX_PAGE_SIZE = 100;

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

  async findAll(query: QueryParceirosDto = {}) {
    const page = this.parsePositiveInt(query.page, 1);
    const pageSize = Math.min(
      this.parsePositiveInt(query.pageSize, 10),
      MAX_PAGE_SIZE,
    );
    const search = query.search?.trim();
    const area = query.area?.trim();
    const cidade = query.cidade?.trim();

    const where = {
      ...(search
        ? {
            OR: [
              { nome: { contains: search, mode: 'insensitive' as const } },
              { email: { contains: search, mode: 'insensitive' as const } },
              { telefone: { contains: search, mode: 'insensitive' as const } },
              { mensagem: { contains: search, mode: 'insensitive' as const } },
            ],
          }
        : {}),
      ...(area
        ? { area: { contains: area, mode: 'insensitive' as const } }
        : {}),
      ...(cidade
        ? { cidade: { contains: cidade, mode: 'insensitive' as const } }
        : {}),
    };

    const [data, total] = await this.prisma.client.$transaction([
      this.prisma.client.parceiro.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      this.prisma.client.parceiro.count({ where }),
    ]);

    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    return {
      data,
      total,
      page,
      pageSize,
      totalPages,
    };
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

  private parsePositiveInt(
    value: number | string | undefined,
    fallback: number,
  ): number {
    const parsed = Number(value);

    if (!Number.isInteger(parsed) || parsed <= 0) {
      return fallback;
    }

    return parsed;
  }
}
