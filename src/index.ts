import { app, connectMongoDb, env } from "@/config";
import { logger } from "@/utils";

app.listen(
  env.APP_PORT,
  ...[
    env.APP_HOST && env.APP_HOST,
    async () => {
      await connectMongoDb().then(() => logger.info("MongoDB connected"));

      logger.info(`Server running on port ${env.APP_PORT}`);
    },
  ]
);
