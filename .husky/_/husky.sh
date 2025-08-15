#!/usr/bin/env sh
if [ -z "$husky_skip_init" ]; then
  debug () {
    [ "$HUSKY_DEBUG" = "1" ] && echo "$1"
  }
  readonly hook_name="$(basename -- "$0")"
  debug "husky:debug $hook_name hook started..."
  export husky_skip_init=1
  sh -e "$0" "$@"
  exitCode="$?"
  if [ $exitCode -ne 0 ]; then
    debug "husky:debug $hook_name hook failed, exit code $exitCode"
  fi
  exit $exitCode
fi
