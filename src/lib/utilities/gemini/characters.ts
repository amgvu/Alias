import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// There are certain edge cases where a user wanting Squid Game characters will return an output
// that contains technically duplicate names since characters in Squid Game have both their real name
// and their player number. A combination of a better system prompt and deduplication via key matching
// with two different aliases after filtering solves this (Seong Gi-Hun (Player 456)), but after a previous
// iteration of this, I realized that the system prompt already handles this well enough and the deduplication
// adds too much latency in large servers for any real end-user value for such uncommon cases.

// Literally a better model might just fix this without post-generation processing but the new models are too slow
// on the user side at the moment which outweighs the benefits of using them for the mentioned edge cases.

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
      type: SchemaType.OBJECT,
      properties: {
        name: {
          type: SchemaType.STRING,
          description: "Name of the character",
          nullable: false,
        },
      },
      required: ["name"],
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
    "${theme}". Return ONLY a JSON array of ${category} names, with no other text or explanations.
    The JSON array should be formatted as follows: ["${category} 1", "${category} 2", "${category} 3", ...].
    ${category} 1 should be the most popular, ${category} 2 the second most, and so on. If fewer than
    ${numMembers} relevant ${category} exist, return ALL that you can find. Please omit any explanations,
    disclaimers, or unnecessary text.`;

  try {
    const result = await model.generateContent(prompt);

    const response = JSON.parse(result.response.text());

    const names = response.map((item: { name: string }) => item.name);
    return names.join(", ");
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};
