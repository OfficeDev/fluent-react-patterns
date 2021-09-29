import { chromium as play, ChromiumBrowser, Page } from 'playwright-chromium'

export type TestsContext = {
  browser: ChromiumBrowser
  page: Page
  storybookUrl: (storyId: string) => string
  warnings: string[]
}

type MochaHooks = {
  beforeAll: () => Promise<void>
  afterAll: () => Promise<void>
}

export const mochaHooks: MochaHooks & Partial<TestsContext> = {
  async beforeAll() {
    this.browser = await play.launch()
    this.page = await this.browser.newPage()
    this.storybookUrl = (storyId) =>
      `http://localhost:4000/iframe.html?id=${storyId}&viewMode=story`
    this.warnings = []
    console.warn = (...content) =>
      this.warnings?.push.apply(
        this.warnings,
        (content || []).map((val) => `${val}`)
      )
  },

  async afterAll() {
    await this.browser?.close()
  },
}
