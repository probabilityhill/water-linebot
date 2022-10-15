const scriptProperties = PropertiesService.getScriptProperties();
const ACCESS_TOKEN = scriptProperties.getProperty('ACCESS_TOKEN');

// ユーザ情報を書きこむシートを取得
const sheetId = "1J765HsUk_NcEYsZb7SuJKsRB-eGRTYZVXeDmdBwaeGI";
const data = SpreadsheetApp.openById(sheetId).getSheets()[0];

function tmp(){
  // console.log(getLetterTypeMsg(1));
}

// ユーザ情報取得
function getUserName(){
  const LAST_ROW = data.getLastRow();  // 最終行取得
  for(let i = 2; i <= LAST_ROW; i++){
    if(data.getRange(i,2).isBlank()){
      const USER_ID = data.getRange(i,1).getValue();
      const URL = 'https://api.line.me/v2/bot/profile/' + USER_ID;
      const USER_PROFILE = UrlFetchApp.fetch(URL,{
        'headers': {
          'Authorization' :  'Bearer ' + ACCESS_TOKEN,
        }
      });      
      data.getRange(i,2).setValue(JSON.parse(USER_PROFILE).displayName);
      data.getRange(i,3).setValue(JSON.parse(USER_PROFILE).statusMessage);
      data.getRange(i,4).setValue(JSON.parse(USER_PROFILE).pictureUrl);
    }
  }
}

// ステータスを設定
function setStatus(userId){

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
    const WRITE_ROW = data.getLastRow()+1;  // 書く行取得
    data.getRange(WRITE_ROW,1).setValue(USER_ID);  // A列目にユーザID記入
    data.getDataRange().removeDuplicates([1]);  // ユーザIDの重複を削除
  }
  else if(EVENT_TYPE === "message"){
    let message;
    if(event.message.type === "text"){
      var text = event.message.text;

      // メッセージ受信
      switch(text){
        case "霧":
        case "きり":
          message = getImgMsg(getImgUrl("w01010"),getImgUrl("ink"));
          break;
      }
      sendReplyMessage(REPLY_TOKEN, message);
    }
  }
}

// メッセージを送信
function sendReplyMessage(replyToken, messages){
  var url = 'https://api.line.me/v2/bot/message/reply';
  var res = UrlFetchApp.fetch(url, {
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
  return res;
}


