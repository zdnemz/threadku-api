import { app, connectDatabase, env} from "@/config";
import { logger } from "@/utils";

app.listen(
  env.APP_PORT,
  ...[
    env.APP_HOST && env.APP_HOST,
    async () => {
      await connectDatabase();
      logger.info(`Server running on port ${env.APP_PORT}`);
    },
  ]
);

