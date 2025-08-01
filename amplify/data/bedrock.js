//configure a serverless function using aws amplifier and aws Lambda to call the bedrock api
//this gunction will take input parameter so for example interest that we have, that will help us to generate travel destination
//This interest will essentially be passed through into a prompt that will be sent to the bedrock api via http post request to claude 3 sonnet model

export function request(ctx) {
  const { interests = [] } = ctx.args;
  const prompt = `Suggest a travel destination using these interests: ${interests.join(', ')}.`;
  return {
    resourcePath: `/model/anthropic.claude-3-sonnet-20240229-v1:0/invoke`,
    method: 'POST',
    params: {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        anthropic_version: 'bedrock-2023-05-31',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `\n\nHuman: ${prompt}\n\nAssistant:`,
              },
            ],
          },
        ],
      }),
    },
  };
}

export function response(ctx) {
  const parsedBody = JSON.parse(ctx.result.body);
  const res = {
    body: parsedBody.content[0].text,
  };
  return res;
}
