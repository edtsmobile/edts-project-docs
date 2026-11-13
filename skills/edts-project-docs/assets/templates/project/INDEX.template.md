<!--
Template for docs/README.md — the docs index. GitHub, GitLab and Bitbucket show it automatically when someone opens the docs/ folder.
List only docs that exist; planned docs stay in STATUS.md. Keep each "Covers" cell to one line.
Remove sections and variant tables with no docs yet. Remove this comment.
-->
# <App Name> Docs

Start with [AGENTS.md](../AGENTS.md) for build steps, configuration, and gotchas. Planned docs and open questions are in [STATUS.md](STATUS.md).

## Overview

| Doc | Covers |
| --- | --- |
| [Architecture](ARCHITECTURE.md) | <one line: pattern, layers, module map> |
| [Status](STATUS.md) | Documentation tasks and open questions |

## Modules

### Feature — screen areas

| Doc | Covers |
| --- | --- |
| [<Area>](modules/feature/<area>.md) | <one line> |

### Core — shared code

| Doc | Covers |
| --- | --- |
| [<Module>](modules/core/<module>.md) | <one line> |

## Services

### REST — backend API

| Doc | Covers |
| --- | --- |
| [<ServiceName>](services/rest/<service>.md) | <one line: domain + main endpoints> |

### SDK

| Doc | Covers |
| --- | --- |
| [<SDK>](services/sdk/<sdk>.md) | <one line: what the app uses it for> |

## Flows

### Sequence — code calls across layers

| Doc | Covers |
| --- | --- |
| [<Flow>](flows/sequence/<flow>.md) | <one line: trigger → outcome> |

### Journey — screens and user choices

| Doc | Covers |
| --- | --- |
| [<Journey>](flows/journey/<flow>.md) | <one line: who, from where, ends with> |
