#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

PROJECT="${PROJECT:-cogos}"
PROFILE="${AWS_PROFILE:-awsedu}"
REGION="${AWS_REGION:-us-west-2}"
REPO="${GITHUB_REPO:-LEIA-qro/CogOS-app}"

WEB_STACK="$PROJECT-web"
ROLE_STACK="$PROJECT-deploy-role"
REPO_VARS=(AWS_ROLE_ARN AWS_REGION WEB_BUCKET WEB_DISTRIBUTION_ID WEB_URL)

cf() { aws --profile "$PROFILE" --region "$REGION" cloudformation "$@"; }

stack_exists() { cf describe-stacks --stack-name "$1" >/dev/null 2>&1; }

output() {
  cf describe-stacks --stack-name "$1" \
    --query "Stacks[0].Outputs[?OutputKey=='$2'].OutputValue" --output text
}

deploy_stack() {
  local name="$1" template="$2"
  shift 2
  echo "→ $name"
  cf deploy --stack-name "$name" --template-file "$template" \
    --parameter-overrides "Project=$PROJECT" "$@" \
    --capabilities CAPABILITY_NAMED_IAM \
    --tags "project=$PROJECT" \
    --no-fail-on-empty-changeset
}

delete_stack() {
  local name="$1"
  stack_exists "$name" || { echo "· $name already gone"; return; }
  echo "→ deleting $name"
  cf delete-stack --stack-name "$name"
  cf wait stack-delete-complete --stack-name "$name"
}

set_repo_vars() {
  local bucket dist url role
  bucket="$(output "$WEB_STACK" BucketName)"
  dist="$(output "$WEB_STACK" DistributionId)"
  url="$(output "$WEB_STACK" Url)"
  role="$(output "$ROLE_STACK" RoleArn)"
  gh variable set AWS_ROLE_ARN --repo "$REPO" --body "$role"
  gh variable set AWS_REGION --repo "$REPO" --body "$REGION"
  gh variable set WEB_BUCKET --repo "$REPO" --body "$bucket"
  gh variable set WEB_DISTRIBUTION_ID --repo "$REPO" --body "$dist"
  gh variable set WEB_URL --repo "$REPO" --body "$url"
}

# Acepta el sujeto con ids numéricos del repo
subject_prefix() {
  gh api "repos/$REPO/actions/oidc/customization/sub" --jq '.sub_claim_prefix // empty' 2>/dev/null || true
}

up() {
  deploy_stack "$WEB_STACK" web.yml
  deploy_stack "$ROLE_STACK" deploy-role.yml "GitHubRepo=$REPO" "SubjectPrefix=$(subject_prefix)"
  set_repo_vars
  status
}

down() {
  if [ "${1:-}" != "--yes" ]; then
    read -r -p "Delete $WEB_STACK and $ROLE_STACK in profile '$PROFILE'? Type '$PROJECT' to confirm: " answer
    [ "$answer" = "$PROJECT" ] || { echo "Cancelled"; exit 1; }
  fi
  if stack_exists "$WEB_STACK"; then
    local bucket
    bucket="$(output "$WEB_STACK" BucketName)"
    echo "→ emptying s3://$bucket"
    aws --profile "$PROFILE" --region "$REGION" s3 rm "s3://$bucket" --recursive --only-show-errors
  fi
  delete_stack "$ROLE_STACK"
  delete_stack "$WEB_STACK"
  for var in "${REPO_VARS[@]}"; do
    gh variable delete "$var" --repo "$REPO" 2>/dev/null || true
  done
  echo "Done. Nothing left running for $PROJECT."
}

status() {
  local name
  for name in "$WEB_STACK" "$ROLE_STACK"; do
    if stack_exists "$name"; then
      echo "$name: $(cf describe-stacks --stack-name "$name" --query 'Stacks[0].StackStatus' --output text)"
      cf describe-stacks --stack-name "$name" \
        --query 'Stacks[0].Outputs[].[OutputKey,OutputValue]' --output text | sed 's/^/  /'
    else
      echo "$name: not deployed"
    fi
  done
}

case "${1:-}" in
  up) up ;;
  down) shift; down "$@" ;;
  status) status ;;
  *) echo "Usage: $0 up | down [--yes] | status" >&2; exit 1 ;;
esac
