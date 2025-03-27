
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MachinesModule } from './machines/machines.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'your-secret-key', 
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    MachinesModule,
  ],
})
export class AppModule {}
