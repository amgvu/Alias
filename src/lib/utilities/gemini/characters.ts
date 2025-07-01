import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

function normalizeName(name: string): string {
  return name
    .replace(/[^\w\s\d]/g, "")
    .toLowerCase()
    .trim();
}

function extractPrimaryAndAlias(itemString: string): {
  primary: string;
  alias: string | null;
} {
  const match = itemString.match(/^(.+?)\s*\((.+?)\)$/);
  if (match) {
    const primaryCandidate = match[1].trim();
    const aliasCandidate = match[2].trim();

    const isPrimaryCandidateNumber = /^(player\s*\d+|\d+)$/i.test(
      primaryCandidate
    );
    const isAliasCandidateNumber = /^(player\s*\d+|\d+)$/i.test(aliasCandidate);

    if (isPrimaryCandidateNumber && !isAliasCandidateNumber) {
      return { primary: aliasCandidate, alias: primaryCandidate };
    } else {
      return { primary: primaryCandidate, alias: aliasCandidate };
    }
  }
  return { primary: itemString.trim(), alias: null };
}

function deduplicateAndCanonicalize(jsonString: string): string[] {
  let rawList: string[];
  try {
    rawList = JSON.parse(jsonString);
    if (
      !Array.isArray(rawList) ||
      !rawList.every((item) => typeof item === "string")
    ) {
      throw new Error("Parsed JSON is not an array of strings.");
    }
  } catch (error) {
    console.warn("Error parsing LLM JSON. Trying regex extraction:", error);
    const matches = jsonString.match(/"([^"]+)"/g);
    if (matches) {
      rawList = matches.map((m) => m.substring(1, m.length - 1).trim());
    } else {
      rawList = [];
    }
  }

  const uniqueIdentifiers = new Map<string, string>();
  const finalOrderedList: string[] = [];

  for (const item of rawList) {
    const { primary: currentPrimaryRaw, alias: currentAliasRaw } =
      extractPrimaryAndAlias(item);

    const normPrimary = normalizeName(currentPrimaryRaw);
    const normAlias = currentAliasRaw ? normalizeName(currentAliasRaw) : null;

    let foundInMap = false;

    if (uniqueIdentifiers.has(normPrimary)) {
      foundInMap = true;
    } else if (normAlias && uniqueIdentifiers.has(normAlias)) {
      foundInMap = true;
    }

    if (!foundInMap) {
      const canonicalRepresentation = item.trim();
      finalOrderedList.push(canonicalRepresentation);

      uniqueIdentifiers.set(normPrimary, canonicalRepresentation);
      if (normAlias) {
        uniqueIdentifiers.set(normAlias, canonicalRepresentation);
      }
    }
  }

  return finalOrderedList;
}

export const characterGen = async (
  theme: string,
  category: string,
  numMembers: number
): Promise<string> => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;
  const genAI = new GoogleGenerativeAI(apiKey);

  const schema = {
    description: `List of popular characters related to a given theme from most to least popular.`,
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.STRING,
      description: `Name of the ${category}`,
    },
  };

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  const prompt = `List ${numMembers} popular ${category} related to the theme "${theme}",
    ordered from most to least popular. For the purposes of this list, "popularity" should
    be determined by a combination of factors, including frequency of online mentions, fan
    sentiment (positive or negative), critical acclaim, and relevance to the core themes of
    "${theme}". If a ${category} has a well-known alternative name, player number, or alias, include it in parentheses after their primary name (e.g., 'Primary Name (Alias/Number)').
    Return ONLY a JSON array of ${category} names, with no other text or explanations.
    The JSON array should be formatted as follows: ["${category} 1", "${category} 2", "${category} 3", ...].
    ${category} 1 should be the most popular, ${category} 2 the second most, and so on. If fewer than
    ${numMembers} relevant ${category} exist, return ALL that you can find. Please omit any explanations,
    disclaimers, or unnecessary text.`;

  try {
    const result = await model.generateContent(prompt);
    const llmResponseText = result.response.text();
    const deduplicatedNames = deduplicateAndCanonicalize(llmResponseText);
    return deduplicatedNames.join(", ");
  } catch (error) {
    console.error("Error generating names:", error);
    throw error;
  }
};
