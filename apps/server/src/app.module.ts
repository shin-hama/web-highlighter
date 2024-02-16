import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { NotificationController } from "./notification/notification.controller";
import { NotificationService } from "./notification/notification.service";
import { PrismaService } from "./prisma/prisma.service";

@Module({
  imports: [],
  controllers: [AppController, NotificationController],
  providers: [AppService, NotificationService, PrismaService],
})
export class AppModule {}
