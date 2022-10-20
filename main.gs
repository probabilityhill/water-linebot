function tmp(){
  const USER_ID = "test";
  let text = "melted";
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
    const ROW = SHEET.getLastRow()+1;  // 書く行取得
    SHEET.getRange(ROW,1,1,6).setValues([[USER_ID,"","","","",0]]);  // ユーザIDとステータス0を設定
    SHEET.getDataRange().removeDuplicates([1]);  // ユーザIDの重複を削除
    sendReplyMessage(REPLY_TOKEN, [getImgMsg(getImgUrl("w0")), getFlexMsg("rule", RULE)]);
  }
  else if(EVENT_TYPE === "message"){
    if(event.message.type === "text"){
      let text = event.message.text.trim();  // 先頭・末尾の空白削除
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


