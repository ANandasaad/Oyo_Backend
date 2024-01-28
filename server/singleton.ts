import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy, any } from "jest-mock-extended";

import { prisma } from "./config";

jest.mock("./config", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(async () => {
  await mockReset(prismaMock as any);
});
export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
