import { readFile } from "fs/promises";
import { render } from "mustache";
import mjml2html from "mjml-core";

const cache = new Map<string, string>();

export async function renderMjmlTemplate(filename: string, data: any): Promise<string> {
    let template: string;

    // in production, only read once
    if (process.env.NODE_ENV === "production") {
        if (!cache.has(filename)) {
            template = await readFile(filename, "utf8");
            cache.set(filename, template);
        } else {
            template = cache.get(filename)!;
        }
    } else {
        template = await readFile(filename, "utf8");
    }

    const rendered = render(template, data);
    const { html, errors } = mjml2html(rendered, {
        keepComments: false,
        beautify: false,
        minify: true,
        validationLevel: "strict",
    });

    if (errors) {
        throw new Error(errors.join("\n"));
    }

    return html;
}
