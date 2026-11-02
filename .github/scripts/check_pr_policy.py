#!/usr/bin/env python3
"""Validate the PR route without interpolating branch names into shell code."""
import os
import re
import sys

if os.environ.get("EVENT_NAME") != "pull_request":
    print("PR route check is not required for this event.")
    sys.exit(0)

base = os.environ.get("BASE_REF", "")
head = os.environ.get("HEAD_REF", "")
same_repo = os.environ.get("HEAD_REPO") == os.environ.get("REPOSITORY")
work_branch = re.fullmatch(r"(feat|fix|refactor|test|docs|chore)/[a-z0-9]+(?:-[a-z0-9]+)*", head)
allowed = (
    (base == "main" and head == "dev" and same_repo)
    or (base == "dev" and head == "main" and same_repo)
    or (base == "dev" and work_branch is not None)
)
if not allowed:
    print("::error::Use work-branch -> dev, dev -> main, or main -> dev in the same repository for releases/sync.")
    sys.exit(1)
print("PR route is valid.")
