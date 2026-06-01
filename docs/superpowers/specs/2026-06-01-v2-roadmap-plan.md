# TermUI v0.2 to v1.0 Roadmap Plan (Wave 5 and beyond)

Date: 2026-06-01

## Why this plan exists

All 52 issues from the first roadmap (`2026-05-31-full-roadmap-plan.md`) are assigned. Wave 1 widget issues are merging. A new contributor arriving today has nothing to claim.

This plan defines the next work pipeline. It draws from four parallel research passes:

1. Per-package codebase gap audit
2. Existing issue and PR audit (what to avoid duplicating)
3. Competitor research (Textual, Ink, Bubble Tea, Ratatui, blessed)
4. Tests, docs, examples, and DX audit

The output is a set of new waves. Each wave is a batch of independent, claimable work. Open these as issues in stages as current issues close.

## What is already covered (do not duplicate)

The current 52 issues plus wave 1 cover:

- 40+ widgets (Badge, Table, charts, prompts, AI widgets)
- Adapter ecosystem (Conf, Commander, Chalk, Git, Execa, AI, GitHub, Keychain)
- Component registry (RFC + schema + CLI)
- 5 app templates (dashboard, form-wizard, file-manager, ai-assistant, cli-tool)
- Core rendering (diff renderer, LiveRender, RenderHook, border merge, inline viewport)
- Hooks (useViewMeta, useModal, useWorker, useTypeahead, useVirtualRows, useSubprocess)
- Theming derivation, Standard Schema validation, constraint layout
- Mouse support RFC, benchmarking, AI PR review

Avoid all of the above. The new waves below are net-new.

## New work, grouped by wave

### Wave 5: Coverage and polish (beginner, no feature code)

Available immediately. Not blocked by any RFC. Best for first-time contributors.

Tests for untested code:
- `@termuijs/dev-server` (5 files, 0 tests): watcher debounce, reload, IPC
- `@termuijs/testing` (2 files, 0 tests): render harness API
- `@termuijs/ui`: Form, NumberInput, PasswordInput, PathInput, ConfirmDialog, NotificationCenter, KeyboardShortcuts, Spacer (9 untested)
- `@termuijs/widgets`: Grid, Sidebar, BigText, Banner, Card, Center, Definition, Gradient, LogView, StatusIndicator, TextInput, Widget base (12 untested)
- `@termuijs/motion`: edge cases beyond the 2 current tests
- `@termuijs/router`: expand past the 1 current test

Examples that do not exist yet:
- `examples/forms-and-validation`: Form, NumberInput, validation, error states
- `examples/multi-screen-router`: router with params and guards
- `examples/ai-streaming`: ChatMessage, ToolCall, StreamingText
- `examples/auth-flow`: login plus protected screens
- `examples/cli-wrapper-live`: spawn and monitor a subprocess

Docs:
- "Choosing your API" guide: imperative vs JSX vs quick
- `DEVELOPMENT.md`: local contributor setup
- Expand thin READMEs: dev-server, motion, router, create-termui-app

### Wave 6: Widget expansion (beginner to intermediate)

New widgets not in the current roadmap. Each is one clean PR.

- DatePicker: calendar-based date selection
- TimePicker: time selection
- ColorPicker: color selection UI (core has color parsing already)
- Slider / RangeInput: numeric range adjustment
- Autocomplete / SearchableSelect: async option loading, search-as-you-type
- TreeTable: tree hierarchy plus columns
- MultilineTextInput: multi-line editing (only single-line TextInput exists)
- SegmentedControl: button-group selection
- Carousel: slide navigation
- ContextMenu: right-click or key-triggered menu

### Wave 7: Hooks and core depth (intermediate)

React-parity hooks and core primitives that are missing.

- useReducer: reducer-pattern state
- useLayoutEffect: synchronous effect variant
- useId: stable ID generation
- useImperativeHandle: ref forwarding control
- useReducer-based form helpers
- Suspense plus lazy(): async component loading with a boundary
- Portal / createPortal: render outside the linear tree (for overlays)
- Clipboard read plus paste event handling (core has write only)
- Wide-character and emoji degradation strategy in the renderer

### Wave 8: Subsystem depth (intermediate to advanced)

Each subsystem package has a clear maturity gap.

Store:
- Middleware API (logging, persistence)
- persist plugin (disk or env)
- Computed and memoized selectors
- immer-style immutable update helper

Motion:
- Keyframe animations (multi-step)
- Custom cubic-bezier easing
- Chained and parallel animation sequencing
- 2D vector animation (spring currently scalar only)

Router:
- Lazy route loading
- Route guards (before and after hooks)
- Nested routes
- Query string parsing
- Param validation via Standard Schema

TSS:
- Rule nesting
- Mixins
- Color functions and calc()
- Pseudo-class states (focus, active, disabled)
- Multi-file imports

Data:
- WebSocket provider
- General REST client hook
- Response caching with invalidation
- Time-series aggregation (history, not point-in-time)

### Wave 9: Developer experience and tooling (intermediate to advanced)

DX features that close the gap with Textual and Ink.

- Error overlay in dev-server: formatted in-app error box, not raw logs
- Theme HMR: reload `.tss` without a full restart
- Devtools inspector UI: render the existing `devtools.ts` data as a live widget tree plus hook-state panel
- Snapshot testing utility in `@termuijs/testing`: ANSI or SVG snapshot assertions
- Accessibility test queries: getByRole, getByLabelText
- VS Code snippets package: widget and hook templates
- Scaffold improvements: example test file, `.vscode/settings.json`, CI workflow template

### Wave 10: Strategic differentiators (advanced, mentor-led epics)

Large, high-impact work. Each becomes an RFC then splits into sub-issues. Mentor-guided.

- Command palette v2: fuzzy action runner with app-registered commands (Textual Ctrl+P parity)
- Web serving (`termui serve`): stream the same app to a browser over WebSocket
- Plugin and extension architecture: third-party widgets, themes, palette commands, devtools panels via a manifest convention
- Full styling system (TCSS v2): selector-driven cascading styles with live reload, beyond current theming
- Demo recording tool (VHS-equivalent): scriptable terminal recordings to GIF, SVG, MP4 for docs and PRs
- Interactive playground and widget gallery: web playground plus searchable live examples (pairs with web serving)

## Execution order

1. Open Wave 5 now. It is unblocked and beginner-safe. It absorbs new contributors immediately while current issues finish.
2. Open Wave 6 as wave 1 widgets merge.
3. Open Wave 7 and Wave 8 in parallel once the core diff renderer and hooks issues (current #69, #71, #77, #85) merge.
4. Open Wave 9 after dev-server and testing have baseline test coverage from Wave 5.
5. Open Wave 10 RFCs last. These need design discussion before code. Assign mentors.

## Labels

Reuse the existing scheme. Each new issue gets:
- `GSSoC 2026`
- one `level:*`
- one or more `area:*` (add `area:playground`, `area:devtools` if needed)
- type labels auto-applied from PR title

## Notes

- Do not open all waves at once. Assigned-but-idle issues block new contributors. Open in stages matched to merge velocity.
- Wave 5 is the release valve for the current "all assigned" state. Prioritize it.
- Wave 10 items are differentiators against opentui and Textual. Treat them as flagship GSSoC epics.
