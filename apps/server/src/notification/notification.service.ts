import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class NotificationService {
  constructor(private readonly prisma: PrismaService) {}

  async notify(): Promise<any> {
    const result = await this.prisma.user.findMany();
    return result;
  }
}
