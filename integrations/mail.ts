import previewEmail from "preview-email";
import { sendMailchimpMail } from "./mailchimp";

export async function sendEmail({ to, subject, html }: { subject: string; html: string; to: string[] }) {
    if (process.env.NODE_ENV !== "production") {
        await previewEmail({
            to,
            subject,
            html,
        });
    } else {
        await sendMailchimpMail({ subject, html, to });
    }
}
