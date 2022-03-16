import fetch from "node-fetch";

type SendEmail = {
    key: string;
    message: {
        from_email: string;
        from_name?: string;
        subject: string;
        text?: string;
        html?: string;
        to: {
            email: string;
            type: "to" | "cc" | "bcc";
        }[];
    };
};

type SendEmailResult = {
    email: string;
    status: "sent" | "queued" | "scheduled" | "rejected" | "invalid";
    reject_reason:
        | "hard-bounce"
        | "soft-bounce"
        | "spam"
        | "unsub"
        | "custom"
        | "invalid-sender"
        | "invalid"
        | "test-mode-limit"
        | "unsigned"
        | "rule";
    _id: string;
};

export async function sendMailchimpMail({ to, subject, html }: { subject: string; html: string; to: string[] }) {
    if (!process.env.MAILCHIMP_KEY || !process.env.MAILCHIMP_EMAIL) {
        throw new Error("Mailchimp not properly setup");
    }

    const mapped: SendEmail = {
        key: process.env.MAILCHIMP_KEY!,
        message: {
            from_email: process.env.MAILCHIMP_EMAIL!,
            subject,
            html,
            to: to.map((email) => ({
                email,
                type: "to",
            })),
        },
    };

    const res = await fetch(`https://mandrillapp.com/api/1.0/messages/send`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(mapped),
    });

    const results: SendEmailResult[] = (await res.json()) as any;
    const errors = results.filter((result) => result.status === "rejected" || result.status === "invalid");
    if (errors.length) {
        throw new Error(
            `Failed to send email: ${errors.map((error) => `${error.email}: ${error.reject_reason}`).join(", ")}`
        );
    }
}
