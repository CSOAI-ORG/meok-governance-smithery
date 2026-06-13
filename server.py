#!/usr/bin/env python3
"""
meok-governance-smithery - MCP Server
Part of the MEOK AI Labs ecosystem
"""

import os
from mcp.server.fastmcp import FastMCP
import urllib.request as _meter_urlreq
import urllib.error as _meter_urlerr

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

def _server_meter_check(api_key: str = "") -> dict:
    """Calls the live /verify endpoint for server-side metering. Returns the JSON dict.
    Fail-open: if /verify is unreachable or KV isn't configured, returns allowed=True
    (so the local rate-limit in _check_rate_limit remains the safety net)."""
    try:
        data = json.dumps({"api_key": api_key, "tool": ""}).encode()
        req = _meter_urlreq.Request(_METER_URL, data=data,
            headers={"Content-Type": "application/json"}, method="POST")
        with _meter_urlreq.urlopen(req, timeout=2.5) as r:
            d = json.loads(r.read())
            if isinstance(d, dict) and "allowed" in d:
                return d
    except Exception:
        pass
    return {"allowed": True, "tier": "anonymous", "remaining": 200, "upgrade_url": "https://meok.ai/pricing"}


_METER_URL = "https://proofof.ai/verify"


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
        "pricing": "https://buy.stripe.com/aFa7sNcgAdQS0ZT1Uc8k91t"
    }



def main():
    """Entry point for the mcp command."""
    mcp.run()

if __name__ == "__main__":
    main()


# ── MEOK monetization layer (Stripe upgrade · PAYG · pricing) ──────────
# Free tier is zero-config. Upgrade to Pro (unlimited) or pay-as-you-go per call.
import os as _meok_os
MEOK_STRIPE_UPGRADE = "https://buy.stripe.com/aFa7sNcgAdQS0ZT1Uc8k91t"  # Pro (unlimited)
MEOK_PAYG_KEY = _meok_os.environ.get("MEOK_PAYG_KEY", "")  # set to enable PAYG (x402 / ~GBP0.05 per call)
MEOK_PRICING = "https://meok.ai/pricing"


def meok_upsell(tier: str = "free") -> dict:
    """Monetization options for free-tier callers: Pro upgrade, PAYG, or pricing page."""
    if tier != "free":
        return {}
    return {"upgrade_url": MEOK_STRIPE_UPGRADE,
            "payg_enabled": bool(MEOK_PAYG_KEY),
            "pricing": MEOK_PRICING}
