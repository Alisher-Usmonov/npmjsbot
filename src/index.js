const TelegramBot = require("node-telegram-bot-api");
const { TOKEN } = require("../config");
const search = require("./modules/search");
const content = require("./modules/content");

const bot = new TelegramBot(TOKEN, {
  polling: true
})

bot.on("message", (message) => {
  const chatId = message.from.id;
  const text = message.text;

  const isCommand = text.startsWith("/");
  try {
    if(isCommand) {
      const command = text.slice(1);
      if(command == "start") {
        bot.sendMessage(chatId, "Assalomu alaykum. Botdan foydalanish uchun chatda @npmjsbot yozing", {
          reply_markup: {
           inline_keyboard: [
            [
              {
                text: "Use now",
                switch_inline_query: ""
              }
            ]
           ]
          }
        })
      }
    } else {

    }
  } catch (error) {
    console.log(error);
  }
})

bot.on("inline_query", async (q) => {
  const pkg = q.query;
  try {
    const data = await search(pkg);

    const result = data?.objects.map((package) => {
      const { description, name } = package.package;
      return {
        type: "article",
        id: Math.random(),
        title: name,
        description: description?.slice(0, 23),
        input_message_content: content(package)
      }
    })
    
    bot.answerInlineQuery(q.id, result)
  } catch (error) {
    console.log(error);
  }
})