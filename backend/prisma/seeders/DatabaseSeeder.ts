import { exec } from 'child_process';
import RoleSeeder from './RoleSeeder';
import UserSeeder from './UserSeeder';
import StatusRentSeeder from './StatusRentSeeder';

class DatabaseSeeder {
    async main() {
        const args = process.argv.slice(2);

        if (args.includes("--reset")) {
            console.log("---- INCLUDE RESET ----");

            await new Promise<void>((resolve, reject) => {
                exec("npx prisma migrate reset --force", (err, stdout, stderr) => {
                if (err) {
                    console.error("Error Drop All Tables");
                    console.error(err);
                    reject();
                    return;
                }
                resolve();
                });
            });

            await new Promise<void>((resolve, reject) => {
                exec("npx prisma migrate dev", (err, stdout, stderr) => {
                if (err) {
                    console.error("Error Re-migrate All Tables");
                    console.error(err);
                    reject();
                    return;
                }
                resolve();
                });
            });
        }
        
        await RoleSeeder.seed()
        // await UserSeeder.seed()

    }
}

new DatabaseSeeder().main();
