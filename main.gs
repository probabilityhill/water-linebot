const scriptProperties = PropertiesService.getScriptProperties();
const ACCESS_TOKEN = scriptProperties.getProperty('ACCESS_TOKEN');

// ユーザ情報を書きこむシートを取得
const sheetId = "1J765HsUk_NcEYsZb7SuJKsRB-eGRTYZVXeDmdBwaeGI";
const data = SpreadsheetApp.openById(sheetId).getSheets()[0];

function tmp(){
  const USER_ID = "test";
  let text = "start";
  console.log(getReplyMsg(USER_ID, text));
}


// イベントを受け取る
function doPost(e){
  const events = JSON.parse(e.postData.contents).events;
  for (var i = 0; i < events.length; i++){
    execute(events[i]);
  }
}

// イベントを受け取ったら実行する
function execute(event){
  const EVENT_TYPE = event.type;
  const USER_ID = event.source.userId;
  const REPLY_TOKEN = event.replyToken;

  if(EVENT_TYPE === "follow"){
    const ROW = data.getLastRow()+1;  // 書く行取得
    data.getRange(ROW,1).setValue(USER_ID);  // A列目にユーザID記入
    data.getDataRange().removeDuplicates([1]);  // ユーザIDの重複を削除
  }
  else if(EVENT_TYPE === "message"){
    if(event.message.type === "text"){
      let text = event.message.text;
      sendReplyMessage(REPLY_TOKEN, getReplyMsg(USER_ID, text));
    }
  }
}

// メッセージを送信
function sendReplyMessage(replyToken, messages){
  const URL = 'https://api.line.me/v2/bot/message/reply';
  const RES = UrlFetchApp.fetch(URL, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': messages 
    }),
  });
  return RES;
}


