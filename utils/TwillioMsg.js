import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const formatMsg = (msg) => {
  let msgArray = JSON.parse(msg);
  let cacheData = [];
  let orders = "";

  msgArray.map((msg) => {
    if (!cacheData.includes(msg)) {
      cacheData.push(msg);
    }
  });

  cacheData.map((data) => {
    const filteredMsg = msgArray.filter((msgArr) => msgArr == data);
    orders += `${filteredMsg[0]} : X${filteredMsg.length}\n`;
  });

  return `\nOrders of the day: \n${orders}`;
};

export function twilioMessage(msg) {
  const sendMsg = formatMsg(msg);
  if (sendMsg) {
    client.messages
      .create({
        body: sendMsg,
        from: "+17076201489",
        to: "+2203626260",
      })
      .then((message) => console.log(message.sid));
  }
}
