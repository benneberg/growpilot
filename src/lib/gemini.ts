import { AuditInput, AuditReport, GeneratedAsset, Insight, Recommendation } from "../types";

export const generateAuditReport = async (input: AuditInput): Promise<AuditReport> => {
  const response = await fetch('/api/v1/generate-audit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error('Failed to generate audit report');
  }

  return response.json();
};

export const generateCreativeVariations = async (
  assets: GeneratedAsset[],
  type: GeneratedAsset["assetType"],
  insights: Insight[],
  recommendations: Recommendation[]
): Promise<GeneratedAsset[]> => {
  const response = await fetch('/api/v1/generate-variations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ assets, type, insights, recommendations }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate variations');
  }

  return response.json();
};
