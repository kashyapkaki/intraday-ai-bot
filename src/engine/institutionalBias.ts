import { fetchInstitutionalData } from "../data/institutionalFetcher";

export interface InstitutionalBias {
    fiiScore: number;
    pcrScore: number;
    oiScore: number;
    totalScore: number;
    direction: "Bullish" | "Bearish" | "Neutral";
}

export async function computeInstitutionalBias(): Promise<InstitutionalBias> {

    const { indexPCR } = await fetchInstitutionalData();

    const fiiLong = Number(process.env.FII_LONG || 65);
    const fiiShort = Number(process.env.FII_SHORT || 35);

    let fiiScore = 0;
    if (fiiLong > 60) fiiScore += 2;
    if (fiiShort > 60) fiiScore -= 2;

    let pcrScore = 0;
    if (indexPCR > 1.2) pcrScore += 1;
    if (indexPCR < 0.8) pcrScore -= 1;

    let oiScore = 0;
    if (indexPCR > 1) oiScore += 1;
    if (indexPCR < 1) oiScore -= 1;

    const totalScore = fiiScore + pcrScore + oiScore;

    let direction: "Bullish" | "Bearish" | "Neutral" = "Neutral";
    if (totalScore >= 3) direction = "Bullish";
    if (totalScore <= -3) direction = "Bearish";

    return {
        fiiScore,
        pcrScore,
        oiScore,
        totalScore,
        direction
    };
}
