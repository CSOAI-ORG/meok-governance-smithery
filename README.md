<div align="center">

# MEOK Governance Smithery

**A JavaScript wrapper for the Python MEOK Governance Engine MCP server, compatible with Smithery deployment.**

[![PyPI](https://img.shields.io/pypi/v/meok-governance-smithery)](https://pypi.org/project/meok-governance-smithery/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![MEOK AI Labs](https://img.shields.io/badge/MEOK_AI_Labs-MCP_Server-purple)](https://meok.ai)

</div>

## Overview

MEOK Governance Smithery is a Smithery-compatible MCP server that wraps the MEOK Governance Engine. It provides governance health checks and server info endpoints via the Model Context Protocol (MCP), deployable on the Smithery platform.

## Tools

| Tool | Description |
|------|-------------|
| `health_check` | Health check endpoint - returns operational status |
| `get_info` | Get server information including name, version, and capabilities |

## Installation

```bash
pip install meok-governance-smithery
```

## Usage with Claude Desktop

Add to your Claude Desktop MCP config (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "meok-governance-smithery": {
      "command": "python",
      "args": ["-m", "meok_governance_smithery.server"]
    }
  }
}
```

## Smithery Deployment

This server includes a `smithery.yaml` configuration for direct deployment on [Smithery](https://smithery.ai).

## License

MIT © [MEOK AI Labs](https://meok.ai)
