import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

export const characterGen = async (
  theme: string,
  category: string,
  numMembers: number
): Promise<string> => {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY as string;
  const genAI = new GoogleGenerativeAI(apiKey);

  const schema = {
    description: `List of popular entities related to a given theme from most to least popular.`,
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.OBJECT,
      properties: {
        name: {
          type: SchemaType.STRING,
          description: "Name of the entity/item",
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
    "${theme}". **However, the maximum number of ${category} names returned must not exceed 100.**
    Return ONLY a JSON array of ${category} names, with no other text or explanations.
    The JSON array should be formatted as follows: ["${category} 1", "${category} 2", "${category} 3", ...].
    ${category} 1 should be the most popular, ${category} 2 the second most, and so on. If fewer than
    ${numMembers} relevant ${category} exist, return ALL that you can find. Please omit any explanations,
    disclaimers, or unnecessary text. **Ensure that each ${category} name does not exceed 32 characters,
    including spaces.**`;

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
