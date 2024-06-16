import { config } from ".";
import supertest from "supertest";

export const request = supertest(config.app);
