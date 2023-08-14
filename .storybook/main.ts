import type { StorybookConfig } from "@storybook/nextjs";

import swcConfig from '../.swcrc.json';

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {
      builder: { useSWC: true },
      strictMode: true,
    },
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal(config) {
    if (config.module?.rules) {
      const swcLoaderRule = config.module.rules.find(
        (rule) =>
          rule instanceof Object &&
          rule.test instanceof RegExp &&
          rule.test.test(".tsx")
      );

      if (
        swcLoaderRule instanceof Object &&
        Array.isArray(swcLoaderRule.use) &&
        swcLoaderRule.use[0] instanceof Object &&
        "options" in swcLoaderRule.use[0]
      ) {
        swcLoaderRule.use[0].options = swcConfig;
      }
    }

    return config;
  },
};
export default config;
