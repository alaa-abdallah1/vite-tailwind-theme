#!/bin/bash

# Local development setup script
# This script sets up the environment for local testing

echo "🔧 Setting up local development environment..."

# Check if GITHUB_TOKEN is set
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ GITHUB_TOKEN environment variable is not set!"
    echo ""
    echo "To fix this, you need to:"
    echo "1. Create a GitHub Personal Access Token with 'read:packages' permission"
    echo "   Go to: https://github.com/settings/tokens"
    echo "2. Set the token as an environment variable:"
    echo "   export GITHUB_TOKEN=your_token_here"
    echo ""
    echo "Alternatively, create a .env file with:"
    echo "   GITHUB_TOKEN=your_token_here"
    echo ""
    exit 1
fi

# Create .npmrc with the token
echo "✅ Creating .npmrc with GitHub token..."
cat > .npmrc << EOF
@payiano:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
EOF

echo "✅ .npmrc configured successfully!"

# Test yarn access
echo "🧪 Testing yarn configuration..."
yarn config list 2>/dev/null | grep -E "(registry|_authToken)" || echo "Yarn config ready"

echo "✅ Environment setup complete!"
echo ""
echo "You can now run:"
echo "  yarn install --frozen-lockfile"
echo "  yarn build"
echo "  yarn test (if available)"
