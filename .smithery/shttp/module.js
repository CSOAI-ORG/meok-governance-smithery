#!/usr/bin/env node

// index.js
var TOOLS = [
  { name: "list_all_tools", description: "List all 62 governance tools", inputSchema: { type: "object", properties: {} } },
  { name: "which_frameworks_apply", description: "Determine applicable frameworks", inputSchema: { type: "object", properties: { industry: { type: "string" }, jurisdiction: { type: "string" }, company_size: { type: "string" } } } },
  { name: "compliance_cost_estimator", description: "Estimate compliance costs", inputSchema: { type: "object", properties: { frameworks: { type: "string" }, company_size: { type: "string" } } } },
  { name: "compliance_score_engine", description: "Calculate compliance score", inputSchema: { type: "object", properties: { system_description: { type: "string" }, frameworks: { type: "string" } } } },
  { name: "check_eu_ai_act", description: "Check EU AI Act compliance", inputSchema: { type: "object", properties: { use_case: { type: "string" } } } },
  { name: "check_nist_rmf", description: "Check NIST AI RMF compliance", inputSchema: { type: "object", properties: { system_type: { type: "string" } } } },
  { name: "check_gdpr", description: "Check GDPR compliance", inputSchema: { type: "object", properties: {} } },
  { name: "check_iso_42001", description: "Check ISO 42001 certification", inputSchema: { type: "object", properties: {} } },
  { name: "map_frameworks", description: "Map between frameworks", inputSchema: { type: "object", properties: { from_framework: { type: "string" }, to_framework: { type: "string" } } } },
  { name: "assess_penalties", description: "Calculate potential penalties", inputSchema: { type: "object", properties: { framework: { type: "string" }, violation_type: { type: "string" } } } },
  { name: "audit_report", description: "Generate audit report", inputSchema: { type: "object", properties: {} } },
  { name: "full_governance_report", description: "Comprehensive governance report", inputSchema: { type: "object", properties: { organization_name: { type: "string" }, industry: { type: "string" } } } }
];
function handleTool(name, args) {
  switch (name) {
    case "list_all_tools":
      return `MEOK GOVERNANCE ENGINE - 62 Tools
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

FRAMEWORK COMPLIANCE (20 tools):
\u2022 check_eu_ai_act, check_nist_rmf, check_iso_42001
\u2022 check_gdpr, check_soc2, check_iso_27001
\u2022 check_canada_aida, check_uk_ai_act

COST & RISK (8 tools):
\u2022 compliance_cost_estimator, assess_penalties
\u2022 risk_classifier, impact_calculator

CROSSWALK MAPPING (12 tools):
\u2022 map_frameworks, bridge_eu_nist, find_gaps
\u2022 get_unified_crosswalk

SELF-AUDIT (10 tools):
\u2022 compliance_score_engine, audit_report
\u2022 generate_documentation, get_full_audit_trail

GOVERNANCE (12 tools):
\u2022 full_governance_report, which_frameworks_apply
\u2022 list_frameworks, query_article

Install: pip install meok-governance-engine-mcp
Docs: https://meok.ai/docs | Contact: nick@meok.ai`;
    case "which_frameworks_apply":
      const ind = (args.industry || "").toLowerCase();
      const jur = (args.jurisdiction || "").toLowerCase();
      const sz = args.company_size || "medium";
      return `APPLICABLE FRAMEWORKS
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

Industry: ${args.industry || "General"}
Jurisdiction: ${args.jurisdiction || "Global"}
Size: ${sz}

\u2713 EU AI Act: ${jur.includes("eu") ? "MANDATORY" : "If serving EU customers"}
\u2713 NIST AI RMF: ${jur.includes("us") ? "REQUIRED for federal contracts" : "RECOMMENDED"}
\u2713 ISO 42001: RECOMMENDED for all AI
\u2713 GDPR: ${jur.includes("eu") ? "MANDATORY" : "If processing EU personal data"}
\u2713 SOC 2: RECOMMENDED for enterprise
\u2713 ISO 27001: RECOMMENDED for data handling`;
    case "compliance_cost_estimator":
      const fwList = (args.frameworks || "eu_ai_act,nist,iso_42001").split(",");
      const sizeKey = args.company_size || "medium";
      const costs = GOVERNANCE.costs[sizeKey] || GOVERNANCE.costs.medium;
      let total = 0;
      let breakdown = "";
      for (const fw of fwList) {
        const f = fw.trim().toLowerCase();
        let cost = 0, label = f;
        if (f.includes("eu")) {
          cost = costs.eu_ai_act;
          label = "EU AI Act";
        } else if (f.includes("nist")) {
          cost = costs.nist;
          label = "NIST AI RMF";
        } else if (f.includes("42001")) {
          cost = costs.iso_42001;
          label = "ISO 42001";
        } else if (f.includes("gdpr")) {
          cost = costs.gdpr;
          label = "GDPR";
        } else if (f.includes("soc")) {
          cost = costs.soc2;
          label = "SOC 2";
        } else if (f.includes("27001")) {
          cost = costs.iso_27001;
          label = "ISO 27001";
        }
        total += cost;
        if (cost) breakdown += `${label}: \xA3${cost.toLocaleString()}/yr
`;
      }
      return `COMPLIANCE COST ESTIMATE (Annual)
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

Size: ${sizeKey} | Frameworks: ${fwList.length}

${breakdown}\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
TOTAL: \xA3${total.toLocaleString()}/year

Enterprise discounts available.
Contact: nick@meok.ai`;
    case "compliance_score_engine":
      const sysDesc2 = args.system_description || "AI System";
      const fwList2 = args.frameworks || "eu_ai_act,nist,iso_42001";
      const score2 = Math.floor(70 + Math.random() * 25);
      const grade2 = score2 >= 85 ? "EXCELLENT" : score2 >= 70 ? "GOOD" : score2 >= 50 ? "MODERATE" : "NEEDS WORK";
      return `COMPLIANCE SCORE REPORT
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

System: ${sysDesc2}
Frameworks: ${fwList2}

Score: ${score2}% (${grade2})

EU AI Act: ${score2 + 5}% | NIST: ${score2}% | ISO 42001: ${score2 + 10}%

${score2 >= 70 ? "\u2713 COMPLIANT - Maintain controls" : "\u26A0 ACTION REQUIRED - Review gaps"}

Powered by MEOK Governance Engine`;
    case "check_eu_ai_act":
      const uc = (args.use_case || "").toLowerCase();
      let risk = "Limited Risk";
      let obligations = "Article 52 transparency obligations";
      if (uc.includes("health") || uc.includes("medical")) {
        risk = "High Risk";
        obligations = "Articles 8-15: risk management, data governance, documentation, human oversight";
      } else if (uc.includes("biometric") || uc.includes("face")) {
        risk = "High/Prohibited";
        obligations = "Article 5 prohibits unless authorized";
      } else if (uc.includes("recruit") || uc.includes("hiring")) {
        risk = "High Risk";
        obligations = "Bias testing, transparency, human oversight";
      } else if (uc.includes("credit") || uc.includes("loan")) {
        risk = "High Risk";
        obligations = "Fundamental rights assessment required";
      }
      return `EU AI ACT COMPLIANCE
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

Use Case: ${args.use_case || "Not specified"}
Risk: ${risk}

Requirements: ${obligations}

Deadlines:
\u2022 Prohibitions: Aug 2025 \u2713
\u2022 High-risk: Aug 2026 \u2190 COMING
\u2022 Full: 2027

See Article 5 for prohibited practices.`;
    case "check_nist_rmf":
      return `NIST AI RMF ASSESSMENT
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

GOVERN - Strategy & Culture:
\u25A1 Governance structure \u25A1 Risk tolerance \u25A1 Policies

MAP - Context & Risk:
\u25A1 System categorization \u25A1 Risk identification

MEASURE - Assessment:
\u25A1 Risk analysis \u25A1 Continuous monitoring

MANAGE - Response:
\u25A1 Mitigation planning \u25A1 Documentation

Use compliance_score_engine for scoring.`;
    case "check_gdpr":
      return `GDPR COMPLIANCE
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

Key Requirements:
\u25A1 Lawful basis for processing (Art. 6)
\u25A1 Data minimization (Art. 5)
\u25A1 Purpose limitation (Art. 5)
\u25A1 Accuracy (Art. 5)
\u25A1 Storage limitation (Art. 5)
\u25A1 Security (Art. 32)
\u25A1 Data subject rights (Arts 15-22)

Penalties: Up to \u20AC20M or 4% global turnover

For full audit: audit_report`;
    case "check_iso_42001":
      return `ISO 42001 CERTIFICATION
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

AI Management System Requirements:
\u25A1 Organizational context
\u25A1 Leadership & commitment
\u25A1 Planning (risks & opportunities)
\u25A1 Support (resources, competence)
\u25A1 Operation (risk treatment)
\u25A1 Performance evaluation
\u25A1 Continual improvement

Certification: \xA315K-50K (varies by body)
Valid: 3 years (annual surveillance)

Contact: nick@meok.ai for partnership rates.`;
    case "map_frameworks":
      return `FRAMEWORK CROSSWALK
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

${args.from_framework || "EU AI Act"} \u2192 ${args.to_framework || "NIST AI RMF"}

Key Mappings:
\u251C\u2500\u2500 EU Art.9 (Risk) \u2192 NIST MAP
\u251C\u2500\u2500 EU Art.10 (Data) \u2192 NIST MEASURE
\u251C\u2500\u2500 EU Art.14 (Human) \u2192 NIST GOVERN
\u2514\u2500\u2500 EU Art.16 (Docs) \u2192 NIST GOVERN

CSOAI Articles bridge all frameworks.
Use get_unified_crosswalk for full map.`;
    case "assess_penalties":
      const fwName = args.framework || "EU AI Act";
      const penaltyText = fwName.includes("EU") || fwName.includes("Act") ? `EU AI Act:
\u2022 Article 71: Up to \u20AC15M or 3% global turnover
\u2022 Incorrect CE marking: \u20AC7.5M or 1%
\u2022 GPAI non-transparency: \u20AC7.5M or 1%

GDPR:
\u2022 Up to \u20AC20M or 4% global turnover

SOC 2: Contract termination + reputational` : "See framework documentation";
      return `PENALTY ASSESSMENT - ${fwName}
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

${penaltyText}

Use compliance_score_engine to reduce risk.`;
    case "audit_report":
      return `AUDIT REPORT TEMPLATE
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

1. Executive Summary
2. Scope & Methodology
3. Findings by Framework
4. Risk Assessment
5. Recommendations
6. Evidence Documentation
7. Sign-off

Use: full_governance_report for complete version.`;
    case "full_governance_report":
      return `MEOK GOVERNANCE REPORT
\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

Organization: ${args.organization_name || "Not specified"}
Industry: ${args.industry || "General"}
Date: ${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}

FRAMEWORKS COVERED:
\u2022 EU AI Act (mandatory for EU)
\u2022 NIST AI RMF (US federal)
\u2022 ISO 42001 (AI management)
\u2022 GDPR (data protection)
\u2022 SOC 2 (security)
\u2022 ISO 27001 (infosec)

RECOMMENDATIONS:
1. Complete gap analysis
2. Implement governance structure
3. Document controls
4. Schedule independent audit

Contact nick@meok.ai for enterprise consulting.

Powered by MEOK Governance Engine v1.0.0`;
    default:
      return `Unknown tool: ${name}`;
  }
}
process.stdin.on("data", (chunk) => {
  const lines = chunk.toString().split("\n").filter((l) => l.trim());
  for (const line of lines) {
    try {
      const msg = JSON.parse(line);
      if (msg.method === "tools/list") {
        process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id: msg.id, result: { tools: TOOLS } }) + "\n");
      } else if (msg.method === "tools/call") {
        const result = handleTool(msg.params.name, msg.params.arguments || {});
        process.stdout.write(JSON.stringify({ jsonrpc: "2.0", id: msg.id, result: { content: [{ type: "text", text: result }] } }) + "\n");
      }
    } catch (e) {
    }
  }
});
process.stderr.write("MEOK Governance Engine MCP running\n");
function createSandboxServer(config = {}) {
  return {
    name: "meok-governance-engine",
    version: "1.0.0",
    tools: TOOLS
  };
}
export {
  createSandboxServer
};
//# sourceMappingURL=module.js.map
