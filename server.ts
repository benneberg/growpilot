import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import PDFDocument from 'pdfkit';
import { fileURLToPath } from 'url';
import NodeCache from 'node-cache';
import { GoogleGenAI, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const auditCache = new NodeCache({ stdTTL: 86400 }); // Cache for 24 hours

// Mock audit data for demonstration
const mockAuditReport = {
  auditId: "aud_123",
  summary: "GrowPilot Audit for example.com. Overall health is strong with key opportunities in technical SEO and content clarity.",
  scores: {
    seo: 85,
    technical: 78,
    contentClarity: 92,
    docsQuality: 65,
    githubMaturity: 88,
    conversionReadiness: 74,
    alignment: 80,
    confidence: 0.95
  },
  insights: [
    {
      id: "ins_1",
      category: "seo",
      severity: "high",
      claim: "Missing meta descriptions on 15 core product pages.",
      observedOrInferred: "observed",
      confidence: 1.0,
      impact: "high",
      effort: "low",
      owner: "seo"
    },
    {
      id: "ins_2",
      category: "technical",
      severity: "medium",
      claim: "Slow LCP on mobile devices (3.2s).",
      observedOrInferred: "observed",
      confidence: 0.85,
      impact: "medium",
      effort: "medium",
      owner: "engineering"
    }
  ],
  recommendations: [
    {
      id: "rec_1",
      title: "Optimize Meta Descriptions",
      category: "seo",
      rationale: "Meta descriptions improve CTR from search results.",
      steps: ["Identify pages with missing descriptions", "Generate AI-optimized descriptions", "Update CMS"],
      expectedImpact: "High",
      effort: "low",
      owner: "seo",
      relatedInsightIds: ["ins_1"]
    }
  ]
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health Endpoint
  app.get('/api/health', (req, res) => res.json({ status: "ok" }));

  // Gemini Proxy Endpoint: Generate Audit
  app.post('/api/v1/generate-audit', async (req, res) => {
    try {
      const input = req.body;
      const cacheKey = JSON.stringify(input);
      const cached = auditCache.get(cacheKey);
      
      if (cached) {
        return res.json(cached);
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured." });
      }

      const ai = new GoogleGenAI({ apiKey });
      const model = "gemini-1.5-pro";

      const prompt = `
        You are GrowPilot, an AI-powered growth intelligence platform.
        Perform a comprehensive audit based on the following inputs:
        Mode: ${input.mode}
        Website: ${input.websiteUrl || "N/A"}
        GitHub: ${input.githubUrl || "N/A"}
        Docs: ${input.docsUrl || "N/A"}
        Competitors: ${input.competitorUrls?.join(", ") || "N/A"}
        Keywords: ${input.keywords?.join(", ") || "N/A"}
        Notes: ${input.notes || "N/A"}

        Your task is to produce a detailed, evidence-grounded report in JSON format.
        The report must include:
        - A summary of findings.
        - Scores (0-100) for SEO, technical, content clarity, docs quality, github maturity, conversion readiness, alignment, and overall confidence.
        - A list of insights with severity, claim, evidence references, and confidence scores.
        - A list of prioritized recommendations. For each recommendation, assign a likely owner from: "engineering", "marketing", "seo", "product", "design", "content". Ensure steps, rationale, and description are tailored to that specific role's expertise and focus. Engineering recommendations should provide code snippets where applicable.
        - A set of initial generated creative assets (ad copy, social posts, landing copy) based on the insights.
        - Comparison findings if competitors are provided.
        - An evidence index mapping source IDs to locations.

        Be specific, technical, and actionable. Use the provided URLs to ground your analysis.
        If you cannot access a URL, infer based on common patterns but mark as "inferred" and lower the confidence score.
      `;

      const response = await ai.models.generateContent({
        model,
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              auditId: { type: Type.STRING },
              summary: { type: Type.STRING },
              scores: {
                type: Type.OBJECT,
                properties: {
                  seo: { type: Type.NUMBER },
                  technical: { type: Type.NUMBER },
                  contentClarity: { type: Type.NUMBER },
                  docsQuality: { type: Type.NUMBER },
                  githubMaturity: { type: Type.NUMBER },
                  conversionReadiness: { type: Type.NUMBER },
                  alignment: { type: Type.NUMBER },
                  confidence: { type: Type.NUMBER },
                },
                required: ["seo", "technical", "contentClarity", "docsQuality", "githubMaturity", "conversionReadiness", "alignment", "confidence"],
              },
              insights: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    category: { type: Type.STRING },
                    severity: { type: Type.STRING },
                    claim: { type: Type.STRING },
                    observedOrInferred: { type: Type.STRING },
                    evidence: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          sourceId: { type: Type.STRING },
                          location: { type: Type.STRING },
                          excerpt: { type: Type.STRING },
                        },
                      },
                    },
                    confidence: { type: Type.NUMBER },
                    impact: { type: Type.STRING },
                    effort: { type: Type.STRING },
                    owner: { type: Type.STRING },
                  },
                },
              },
              recommendations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    title: { type: Type.STRING },
                    category: { type: Type.STRING },
                    rationale: { type: Type.STRING },
                    steps: { type: Type.ARRAY, items: { type: Type.STRING } },
                    expectedImpact: { type: Type.STRING },
                    effort: { type: Type.STRING },
                    owner: { type: Type.STRING },
                    relatedInsightIds: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                },
              },
              generatedAssets: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    assetType: { type: Type.STRING },
                    type: { type: Type.STRING },
                    content: { type: Type.STRING },
                    platform: { type: Type.STRING },
                    title: { type: Type.STRING },
                  },
                  required: ["id", "assetType", "content"],
                },
              },
              evidenceIndex: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    sourceId: { type: Type.STRING },
                    location: { type: Type.STRING },
                  },
                },
              },
              coverage: {
                type: Type.OBJECT,
                properties: {
                  sourceCount: { type: Type.NUMBER },
                  sourceTypes: { type: Type.ARRAY, items: { type: Type.STRING } },
                  missingCriticalSources: { type: Type.ARRAY, items: { type: Type.STRING } },
                },
              },
            },
            required: ["summary", "scores", "insights", "recommendations", "evidenceIndex", "coverage"],
          },
        },
      });

      const report = JSON.parse(response.text || "{}");
      auditCache.set(cacheKey, report);
      res.json(report);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to generate audit report" });
    }
  });

  app.post('/api/v1/generate-variations', async (req, res) => {
    try {
      const { assets, type, insights, recommendations } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is not configured." });
      }

      const ai = new GoogleGenAI({ apiKey });
      const model = "gemini-1.5-pro";

      const prompt = `
        You are a professional growth marketer at GrowPilot.
        Based on the following audit insights and recommendations, generate 3 high-performance variations for the asset type: ${type}.

        Insights:
        ${insights.map((i: any) => `- ${i.claim}`).join('\n')}

        Recommendations:
        ${recommendations.map((r: any) => `- ${r.title}: ${r.rationale}`).join('\n')}

        Existing Assets of this type:
        ${assets.filter((a: any) => a.assetType === type).map((a: any) => `- ${a.content}`).join('\n')}

        Generate 3 NEW variations. Be creative, distinct, and highly aligned with the growth goals.
        Return a list of assets in JSON format.
      `;

      const response = await ai.models.generateContent({
        model,
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                assetType: { type: Type.STRING },
                type: { type: Type.STRING },
                content: { type: Type.STRING },
                platform: { type: Type.STRING },
                title: { type: Type.STRING },
              },
              required: ["id", "assetType", "content"],
            },
          },
        },
      });

      res.json(JSON.parse(response.text || "[]"));
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to generate variations" });
    }
  });

  // Export Endpoints
  app.get('/api/v1/audits/:auditId/export', async (req, res) => {
    try {
      const { auditId } = req.params;
      const { format } = req.query;

      // In a real app, fetch the audit from DB
      const audit = mockAuditReport;

      if (format === 'json') {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', `attachment; filename=audit-${auditId}.json`);
        return res.send(JSON.stringify(audit, null, 2));
      }

      if (format === 'markdown') {
        let md = `# Audit Report: ${auditId}\n\n`;
        md += `## Summary\n${audit.summary}\n\n`;
        md += `## Scores\n`;
        Object.entries(audit.scores).forEach(([key, val]) => {
          md += `- **${key}**: ${val}\n`;
        });
        md += `\n## Insights\n`;
        audit.insights.forEach(ins => {
          md += `### [${ins.severity.toUpperCase()}] ${ins.category}\n${ins.claim}\n\n`;
        });
        md += `\n## Recommendations\n`;
        audit.recommendations.forEach(rec => {
          md += `### ${rec.title}\n${rec.rationale}\n\n**Steps:**\n${rec.steps.map(s => `- ${s}`).join('\n')}\n\n`;
        });

        res.setHeader('Content-Type', 'text/markdown');
        res.setHeader('Content-Disposition', `attachment; filename=audit-${auditId}.md`);
        return res.send(md);
      }

      if (format === 'pdf') {
        const doc = new PDFDocument();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=audit-${auditId}.pdf`);
        doc.pipe(res);

        doc.fontSize(25).text(`Audit Report: ${auditId}`, { underline: true });
        doc.moveDown();
        doc.fontSize(16).text('Summary');
        doc.fontSize(12).text(audit.summary);
        doc.moveDown();

        doc.fontSize(16).text('Scores');
        Object.entries(audit.scores).forEach(([key, val]) => {
          doc.fontSize(12).text(`${key}: ${val}`);
        });
        doc.moveDown();

        doc.fontSize(16).text('Insights');
        audit.insights.forEach(ins => {
          doc.fontSize(12).text(`[${ins.severity.toUpperCase()}] ${ins.category}: ${ins.claim}`);
        });
        doc.moveDown();

        doc.fontSize(16).text('Recommendations');
        audit.recommendations.forEach(rec => {
          doc.fontSize(12).text(`${rec.title}`);
          doc.fontSize(10).text(`Rationale: ${rec.rationale}`);
          doc.fontSize(10).text(`Steps: ${rec.steps.join(', ')}`);
          doc.moveDown(0.5);
        });

        doc.end();
        return;
      }

      res.status(400).send('Invalid format');
    } catch (err) {
      console.error(err);
      res.status(500).send("Export failed");
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
