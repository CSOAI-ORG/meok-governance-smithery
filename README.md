# MEOK Governance Engine MCP - Smithery Edition

A JavaScript wrapper for the Python MEOK Governance Engine MCP server, compatible with Smithery deployment.

## Status

⚠️ **Published but sandbox scan failed** - Smithery couldn't run the server without config. Server was built but card generation failed.

## For Manual Smithery Setup

If you can access Smithery dashboard at https://smithery.ai:

1. Go to https://smithery.ai/new
2. Select "JavaScript/TypeScript" 
3. Enter: `https://github.com/meok-ai/governance-engine-smithery` as repo
4. Entry point: `index.js`
5. This JS version provides 12 core governance tools

## Or Add Directly

Users can add this server via Smithery CLI:
```
smithery mcp add https://server.smithery.ai/meok-ai/governance-engine
```

## Tools Available

1. **list_all_tools** - List all 62 governance tools
2. **which_frameworks_apply** - Determine applicable frameworks by industry/jurisdiction
3. **compliance_cost_estimator** - Estimate annual compliance costs
4. **compliance_score_engine** - Calculate compliance score for AI systems
5. **check_eu_ai_act** - Check EU AI Act compliance by use case
6. **check_nist_rmf** - Check NIST AI RMF compliance
7. **check_gdpr** - GDPR compliance check
8. **check_iso_42001** - ISO 42001 certification check
9. **map_frameworks** - Map compliance between frameworks
10. **assess_penalties** - Calculate regulatory penalties
11. **audit_report** - Generate audit report
12. **full_governance_report** - Comprehensive governance report

## Full Version

For the full 62-tool Python version with all crosswalks:
- PyPI: `pip install meok-governance-engine-mcp`
- GitHub: https://github.com/CSOAI-ORG/meok-governance-engine-mcp
- Docs: https://meok.ai/docs

## Contact

nick@meok.ai | meok.ai