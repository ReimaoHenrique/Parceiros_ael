import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ParceirosController } from './parceiros.controller';
import { ParceirosService } from './parceiros.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RhGuard } from '../auth/rh.guard';

@Module({
  imports: [PrismaModule],
  controllers: [ParceirosController],
  providers: [ParceirosService, JwtAuthGuard, RhGuard],
})
export class ParceirosModule {}
