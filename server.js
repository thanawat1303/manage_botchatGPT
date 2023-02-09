const line = require("@line/bot-sdk");
const dotenv = require("dotenv");
const env = dotenv.config().parsed;
const fs = require("fs");

const lineConfig = {
  channelAccessToken: env.ACCESS_TOKEN,
  channelSecret: env.SECRET_TOKEN
};

const client = new line.Client(lineConfig);

signinRich = {
  size: {
    width: 2500,
    height: 843
  },
  selected: true,
  name: "หมอช่วยได้",
  chatBarText: "หมอช่วยได้",
  areas: [
    {
      bounds: {
        x: 0,
        y: 0,
        width: 2500,
        height: 843
      },
      action: {
        type: "postback",
        text: "",
        data: "sign"
      }
    }
  ]
};

const Create = () => {
  client.createRichMenu(signinRich).then(id => {
    var image = fs.readFileSync("assets/img/bg.png");
    client.setRichMenuImage(id, image, "image/png").then(val => {
      client.setDefaultRichMenu(id);
    });
  });
};

const Delete = () => {
  client.getRichMenuList().then(val => {
    val.map(item => client.deleteRichMenu(item.richMenuId));
  });
};

const GetAll = () => {
  client.getRichMenuList().then(val => {
    val.map(item => console.log(item.richMenuId));
  });
};


