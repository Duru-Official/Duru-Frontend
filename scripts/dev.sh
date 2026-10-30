#!/bin/zsh
set -e
cd "$(dirname "$0")/.."
if [[ -d /opt/homebrew/opt/node@24/bin ]]; then
  export PATH="/opt/homebrew/opt/node@24/bin:$PATH"
fi
exec npm run dev
