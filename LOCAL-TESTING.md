# Local Testing Guide for GitHub Actions Workflow

This guide explains how to test the GitHub Actions workflow locally before pushing to the main branch.

## Quick Start (Recommended)

Run the automated test script:

```bash
./test-local.sh
```

This script will:

- ✅ Install dependencies (skipping private packages for testing)
- ✅ Build the project
- ✅ Simulate version bump
- ✅ Test publish with dry-run
- ✅ Restore original configuration

## Manual Testing Steps

### 1. Setup Environment (if using private packages)

If you need to test with actual private packages:

```bash
# Set your GitHub token
export GITHUB_TOKEN=your_github_personal_access_token

# Run setup script
./setup-local.sh
```

### 2. Test Individual Steps

```bash
# Install dependencies
yarn install --frozen-lockfile

# Build project
yarn build

# Test version bump (without committing)
yarn version --patch --no-git-tag-version --dry-run

# Test publish (dry run)
yarn publish --dry-run --non-interactive
```

### 3. Full Workflow Simulation

```bash
# Simulate the complete workflow
git config user.name "Test User"
git config user.email "test@example.com"

# Install and build
yarn install --frozen-lockfile
yarn build

# Version bump (actual - be careful!)
yarn version --patch --no-git-tag-version
NEW_VERSION=$(node -p "require('./package.json').version")
echo "New version: $NEW_VERSION"

# Test publish (remove --dry-run to actually publish)
yarn publish --dry-run --non-interactive
```

## Using act (GitHub Actions Runner)

Install `act` to run the exact GitHub Actions locally:

```bash
# Install act
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash

# Create secrets file
echo "GITHUB_TOKEN=your_token" > .secrets
echo "NPM_TOKEN=your_npm_token" >> .secrets

# Run the workflow
act push -s GITHUB_TOKEN -s NPM_TOKEN --secret-file .secrets
```

## Troubleshooting

### Private Package Access Issues

If you get 401 errors for `@payiano/ha-types`:

1. **Create GitHub Personal Access Token**:

   - Go to https://github.com/settings/tokens
   - Create token with `read:packages` permission

2. **Set environment variable**:

   ```bash
   export GITHUB_TOKEN=your_token_here
   ```

3. **Use the setup script**:
   ```bash
   ./setup-local.sh
   ```

### Yarn Configuration Errors

If yarn fails to parse `.npmrc`:

```bash
# Use the test script which handles this automatically
./test-local.sh
```

### Build Failures

If build fails:

```bash
# Check if all dependencies are installed
yarn install

# Check for TypeScript errors
yarn tsc --noEmit

# Check package.json for build script
cat package.json | grep -A 5 -B 5 "scripts"
```

## Files Created for Testing

- `setup-local.sh` - Sets up environment with GitHub token
- `test-local.sh` - Runs complete workflow test without private packages
- `.npmrc` - NPM configuration for GitHub packages
- `.secrets` - Local secrets file for act (add your tokens here)

## Security Notes

- Never commit `.secrets` or tokens to git
- The `.gitignore` includes `.secrets`, `.npmrc` for safety
- Use environment variables for sensitive data
- Always use `--dry-run` for publish testing unless you intend to publish

## What Gets Tested

✅ **Dependencies**: Installation with yarn
✅ **Build**: TypeScript compilation  
✅ **Version Bump**: Semantic version increment
✅ **Publish**: Dry run of npm publish
✅ **Git Operations**: Configuration and tagging simulation
✅ **Environment**: Node.js and yarn setup
