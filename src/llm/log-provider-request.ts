import type { Api, Model } from "@mariozechner/pi-ai";

/**
 * Logs the resolved LLM endpoint (base URL + API surface + model id) to stderr.
 * Use this to verify config overrides such as `openai.baseUrl` in config.json.
 */
export function logLlmProviderRequest(model: Model<Api>, canonicalModelId: string): void {
  const baseUrl = typeof model.baseUrl === "string" ? model.baseUrl : String(model.baseUrl ?? "");
  const api = typeof model.api === "string" ? model.api : String(model.api ?? "");
  const modelId = typeof model.id === "string" ? model.id : canonicalModelId;
  console.error(`[summarize] LLM provider request: baseUrl=${baseUrl} api=${api} model=${modelId}`);
}

/**
 * Logs a direct HTTP URL for document-style LLM calls (no query string, to avoid leaking keys).
 */
export function logLlmProviderHttpUrl(label: string, url: URL | string): void {
  try {
    const u = typeof url === "string" ? new URL(url) : url;
    console.error(`[summarize] LLM HTTP request (${label}): ${u.origin}${u.pathname}`);
  } catch {
    console.error(`[summarize] LLM HTTP request (${label}): ${String(url)}`);
  }
}
