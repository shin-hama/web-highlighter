import { Controller, Get } from "@nestjs/common";

import { NotificationService } from "./notification.service";

@Controller("notification")
export class NotificationController {
  constructor(private readonly service: NotificationService) {}

  @Get()
  async getHello(): Promise<any> {
    return await this.service.notify();
  }
}
