# Config

## Ban

### NPM

You can ban NPM packages by adding them to the `BANNED_NPM` array in `src/config.ts`. The children are [`micromatch`](https://github.com/micromatch/micromatch) patterns.

```ts
export const BANNED_NPM: NPMBannedList = [
	// Ban the `vue` package
	"vue@*/**",
	// Ban vue 2
	"vue@2.*.*/**",
	// Ban a specified file
	"vue@*/package.json",
];
```

### GitHub

You can ban GitHub users / repositories by adding them to the `BANNED_GITHUB` array in `src/config.ts`. The children are [`micromatch`](https://github.com/micromatch/micromatch) patterns.

```ts
export const BANNED_GITHUB: GitHubBannedList = [
	// Ban the `vuejs` organization
	"vuejs@*/**",
	// Ban the `vuejs/vue` repository
	"vuejs/vue@*/**",
	// Ban the `vuejs/vue` repository's `dev` branch
	"vuejs/vue@dev/**",
	// Ban a specified file
	"vuejs/vue@*/package.json",
];
```
