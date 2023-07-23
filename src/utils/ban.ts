import mm from "micromatch";

import type { GitHubBannedList, NPMBannedList } from "../types";

export const isBanned = (
	bannedList: GitHubBannedList | NPMBannedList,
	url: string,
) => mm.isMatch(url, bannedList);
