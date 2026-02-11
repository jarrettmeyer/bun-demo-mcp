---
name: version
description: Update the project version in package.json and manifest.json. Use when the user says things like "update the version to 1.0.1" or "bump the version".
argument-hint: <version>
disable-model-invocation: true
allowed-tools: Bash, Read, Edit
---

Update the project version to `$ARGUMENTS`.

## Steps

1. Run `npm version $ARGUMENTS --no-git-tag-version` to update `package.json`.
2. Read `manifest.json` and update its `"version"` field to match the new version.
3. Report the completed version change to the user.

## Rules

- The version argument must be a valid semver string (e.g., `1.2.3`) or a semver bump keyword (`major`, `minor`, `patch`, `premajor`, `preminor`, `prepatch`, `prerelease`).
- If no argument is provided, ask the user what version they want.
- Always use `--no-git-tag-version` with `npm version` to avoid creating a git tag automatically.
- After updating, confirm both files were changed and show the new version.
