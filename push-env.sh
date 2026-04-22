#!/bin/bash
# Pushes env vars from .env.local to Vercel production
# Skips VERCEL_OIDC_TOKEN (managed by Vercel automatically)

ENV_FILE=".env.local"
ENVIRONMENT="production"

while IFS= read -r line || [[ -n "$line" ]]; do
  # Skip comments and empty lines
  [[ "$line" =~ ^#.*$ || -z "$line" ]] && continue

  # Split into name and value
  name="${line%%=*}"
  value="${line#*=}"

  # Skip Vercel-managed token
  [[ "$name" == "VERCEL_OIDC_TOKEN" ]] && continue

  echo "Adding $name..."
  echo "$value" | npx vercel env add "$name" "$ENVIRONMENT" --force 2>&1

done < "$ENV_FILE"

echo ""
echo "Done. Redeploy Vercel for changes to take effect."
