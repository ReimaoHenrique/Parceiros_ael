import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ParceirosController } from './parceiros.controller';
import { ParceirosService } from './parceiros.service';

@Module({
  imports: [PrismaModule],
  controllers: [ParceirosController],
  providers: [ParceirosService],
})
export class ParceirosModule {}
