import { INestApplication, Injectable, OnModuleInit } from "@nestjs/common";

import { PrismaClient } from "@whl/db";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    // @ts-expect-error test
    this.$on("beforeExit", async () => {
      await app.close();
    });
  }
}
