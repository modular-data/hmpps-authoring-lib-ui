type TextContent = { text: string; html?: never }

type HtmlContent = { text?: never; html: string }

export type TextOrHtml = TextContent | HtmlContent
