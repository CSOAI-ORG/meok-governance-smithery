#!/usr/bin/env python3
"""
meok-governance-smithery - MCP Server
Part of the MEOK AI Labs ecosystem
"""

from fastmcp import FastMCP

mcp = FastMCP("meok-governance-smithery")

# ── Structured Output Helpers ─────────────────────────────────


_MEOK_API_KEY = os.environ.get("MEOK_API_KEY", "")

def check_access(api_key: str = ""):
    """Fallback auth check when shared auth engine is not available."""
    if _MEOK_API_KEY and api_key and api_key == _MEOK_API_KEY:
        return True, "OK", "pro"
    if _MEOK_API_KEY and api_key and api_key != _MEOK_API_KEY:
        return False, "Invalid API key.", "free"
    return True, "OK, Pro at https://www.csoai.org/checkout", "free"

def structured_output(data, summary: str = ""):
    """Return MCP-compatible structured output with both LLM text and protocol-level data.
    
    Args:
        data: The result data (dict, list, or Pydantic model)
        summary: Brief human-readable summary for the LLM (auto-generated if empty)
    """
    if hasattr(data, 'model_dump'):
        data_dict = data.model_dump()
    else:
        data_dict = data
    
    if not summary:
        # Auto-generate summary from key fields
        parts = []
        for k, v in list(data_dict.items())[:3]:
            if isinstance(v, (str, int, float)):
                parts.append(f"{k}: {v}")
        summary = " | ".join(parts) if parts else "Result"
    
    return {
        "content": [{"type": "text", "text": summary + "\n\n" + str(data_dict)}],
        "structuredContent": data_dict,
        **data_dict  # Legacy compatibility
    }


def error_output(message: str, code: str = "INTERNAL_ERROR", upgrade_url: str = ""):
    """Return structured error output."""
    result = {
        "content": [{"type": "text", "text": f"Error: {message}"}],
        "structuredContent": {"error": message, "code": code},
        "error": message,
        "code": code
    }
    if upgrade_url:
        result["structuredContent"]["upgrade_url"] = upgrade_url
        result["upgrade_url"] = upgrade_url
    return result


@mcp.tool()
async def health_check() -> str:
    """Health check endpoint"""
    return "OK - meok-governance-smithery operational"

@mcp.tool()  
async def get_info() -> dict:
    """Get server information"""
    return {
        "name": "meok-governance-smithery",
        "version": "1.0.0",
        "publisher": "MEOK AI Labs",
        "pricing": "https://buy.stripe.com/00wfZjcgAeUW4c5cyQ8k90K"
    }



def main():
    """Entry point for the mcp command."""
    mcp.run()

if __name__ == "__main__":
    main()
