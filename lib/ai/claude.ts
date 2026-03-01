import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function generateWithClaude(
  systemPrompt: string,
  userPrompt: string,
  options: {
    maxTokens?: number;
    temperature?: number;
    stream?: boolean;
  } = {}
): Promise<string | ReadableStream> {
  const {
    maxTokens = 4096,
    temperature = 0.7,
    stream = false,
  } = options;

  if (stream) {
    const stream = await anthropic.messages.stream({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: maxTokens,
      temperature,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    return new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            controller.enqueue(
              new TextEncoder().encode(chunk.delta.text)
            );
          }
        }
        controller.close();
      },
    });
  }

  const response = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: maxTokens,
    temperature,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: userPrompt,
      },
    ],
  });

  const textContent = response.content.find((c) => c.type === "text");
  return textContent && textContent.type === "text" ? textContent.text : "";
}

export async function generateHeadlines(
  productDescription: string,
  marketingAngle: string
): Promise<string[]> {
  const systemPrompt = `Tu es un expert en copywriting pour landing pages SaaS.

Génère 2 variantes de headlines (H1) percutantes basées sur la description du produit fournie.

RÈGLES :
- Pas d'emojis
- Maximum 12 mots par headline
- Focus sur le bénéfice principal
- Ton professionnel mais engageant
- En français

Réponds uniquement avec un array JSON de 2 strings.`;

  const userPrompt = `Produit : ${productDescription}
Angle marketing : ${marketingAngle}

Génère 2 headlines percutantes.`;

  const response = await generateWithClaude(systemPrompt, userPrompt, {
    maxTokens: 500,
    temperature: 0.8,
  });

  try {
    return JSON.parse(response as string);
  } catch {
    return [];
  }
}
