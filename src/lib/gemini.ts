import { GoogleGenAI, Type } from "@google/genai";
import { AuditInput, AuditReport, GeneratedAsset, Insight, Recommendation } from "../types";

const apiKey = process.env.GEMINI_API_KEY;

export const generateAuditReport = async (input: AuditInput): Promise<AuditReport> => {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const ai = new GoogleGenAI({ apiKey });
  // Use a stable model
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

  return JSON.parse(response.text || "{}");
};

export const generateCreativeVariations = async (
  assets: GeneratedAsset[],
  type: GeneratedAsset["assetType"],
  insights: Insight[],
  recommendations: Recommendation[]
): Promise<GeneratedAsset[]> => {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = "gemini-1.5-pro";

  const prompt = `
    You are a professional growth marketer at GrowPilot.
    Based on the following audit insights and recommendations, generate 3 high-performance variations for the asset type: ${type}.

    Insights:
    ${insights.map(i => `- ${i.claim}`).join('\n')}

    Recommendations:
    ${recommendations.map(r => `- ${r.title}: ${r.rationale}`).join('\n')}

    Existing Assets of this type:
    ${assets.filter(a => a.assetType === type).map(a => `- ${a.content}`).join('\n')}

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

  return JSON.parse(response.text || "[]");
};
