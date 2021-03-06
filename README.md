# LabelSync

### Usage

1. Edit labels inside `labelsync.ts`
2. Commit and push on `master` branch (husky pre-commit script runs to update `labelsync.yml`)

### Development

- We wrap `label-sync` library for easier label management `lib/labelsync-wrapper.ts`
- Changing our label system (e.g. new label category or change color of an existing category) can be done in `lib/core.ts`.

### How it works

- We have [LabelSync Manager](https://label-sync.com/) [GitHub App](https://github.com/apps/labelsync-manager) built by [@maticzav](https://github.com/maticzav) [installed on our GitHub org](https://github.com/organizations/prisma-labs/settings/installations/7137275).
- It monitors this specially named repo and applies all changes detected to `labelsync.yml` on `master` branch.
