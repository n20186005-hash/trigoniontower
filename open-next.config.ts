import { cloudflare } from "@opennextjs/cloudflare";

export default cloudflare({
  // The build output (.open-next) is uploaded by `wrangler deploy`.
  // Routes are handled by the generated Worker; no extra overrides needed.
});
