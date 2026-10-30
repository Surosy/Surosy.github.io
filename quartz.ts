import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import FontSize from "./quartz/components/FontSize"

const config = await loadQuartzConfig()
export default config
const siteLayout = await loadQuartzLayout()
for (const pageLayout of [siteLayout.defaults, ...Object.values(siteLayout.byPageType)]) {
  pageLayout.beforeBody = [FontSize, ...(pageLayout.beforeBody ?? [])]
}
export const layout = siteLayout
