import OpenAI from "openai";

const openai = new OpenAI({apiKey: '', dangerouslyAllowBrowser: true });


export async function sendMsgToOpenAI(message) {
  const completion = await openai.chat.completions.create({
    messages: [
        { role: 'user', content: message }
      ],
    model: "gpt-3.5-turbo-1106",
    // response_format: { type: "json_object" },
    max_tokens: 256,
  });
    console.log("ChatGpt response = ", completion.choices[0].message.content)
   return completion.choices[0].message.content;
}




// export async function sendMsgToOpenAI (message) {
//     const res =  await openai.chat.completions.create({
//         model: 'text-davinci-003',
//         prompt: message,
//         temperature: 0.7,
//         max_tokens: 256,
//         top_p: 1,
//         frequency_penalty: 0,
//         presence_penalty: 0
//     });
//     return res.data.choices[0].text;
// }