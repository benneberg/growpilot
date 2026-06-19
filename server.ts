import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import PDFDocument from 'pdfkit';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

  // Export Endpoints
  app.get('/api/v1/audits/:auditId/export', async (req, res) => {
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
