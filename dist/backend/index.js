"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const config_1 = require("./config");
const database_1 = require("./database");
async function main() {
    await (0, server_1.startServer)(config_1.config.server);
}
main()
    .then(async () => {
    await database_1.prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await database_1.prisma.$disconnect();
    process.exit(1);
});
