import { resolver } from "blitz";
import { StartQuizSchema } from "../validations";
import db from "db";
import { Role } from "../../../types";

export default resolver.pipe(resolver.zod(StartQuizSchema), async function ({ firstName, email, lastName }, ctx) {
    if (ctx.session.userId) {
        throw new Error("You are already logged in");
    }

    const user = await db.user.create({
        data: {
            email,
            firstName,
            lastName: lastName || undefined,
        },
        select: {
            id: true,
            role: true,
        },
    });

    await ctx.session.$create({ userId: user.id, role: user.role as Role });
});
