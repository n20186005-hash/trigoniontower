import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// The build output (.open-next) is uploaded by `wrangler deploy`.
// No custom overrides are needed: the default handlers cover this site.
export default defineCloudflareConfig();
