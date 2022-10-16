const scriptProperties = PropertiesService.getScriptProperties();
const ACCESS_TOKEN = scriptProperties.getProperty('ACCESS_TOKEN');

// ユーザ情報を書きこむシートを取得
const sheetId = "1J765HsUk_NcEYsZb7SuJKsRB-eGRTYZVXeDmdBwaeGI";
const data = SpreadsheetApp.openById(sheetId).getSheets()[0];

function tmp(){
  const USER_ID = "Ueb6e9beb1bea90d7c0aa4527e5ac709c";
  let text = "きり";
  let status = getStatus(USER_ID);  // ステータスを取得
  const ansList = ["きり", "霧"];
  const hiraList = ["きり"];
  const kanList = ["霧"];

  // メッセージ受信
  if(ansList.includes(text)){
    if(hiraList.includes(text)){
      setLetterType(USER_ID, status, 0);
    }
    else if(kanList.includes(text)){
      setLetterType(USER_ID, status, 1);
    }
    status = "ink";  // ステータスを更新
    message = getImgMsg(getImgUrl("w01010"),getImgUrl(status));
    setStatus(USER_ID, status);
  }

  console.log();
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
function setStatus(userId, status){
  const ROW = data.createTextFinder(userId).findNext().getRow();  // ユーザIDが存在する行
  data.getRange(ROW,6).setValue(status);  // F列目にstatusを記入
}
// ステータスを取得
function getStatus(userId){
  const ROW = data.createTextFinder(userId).findNext().getRow();  // ユーザIDが存在する行
  return data.getRange(ROW,6).getValue();  // F列目のstatusを取得  
}

// 文字種を記録
function setLetterType(userId, status, type){
  const ROW = data.createTextFinder(userId).findNext().getRow();  // ユーザIDが存在する行
  // const STATUS = getStatus(userId);  // ステータスを取得(1~5)
  data.getRange(ROW,6+status).setValue(type);  // (F+status)列目にtypeを記入
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
      let text = event.message.text;
      let status = getStatus(USER_ID);  // ステータスを取得
      const ansList = ["あかみ","せんこう","かいせい","し","きり","赤身","線香","快晴","四","霧"];
      const hiraList = ["あかみ","せんこう","かいせい","し","きり"];
      const kanList = ["赤身","線香","快晴","四","霧"];

      // 応答メッセージ
      if(ansList.includes(text)){  // 正解の場合
        
        if(hiraList.includes(text)){  // ひらがなの場合
          setLetterType(USER_ID, status, 0);
        }
        else if(kanList.includes(text)){  // 漢字の場合
          setLetterType(USER_ID, status, 1);
        }
        status = "ink";  // ステータスを更新
        message = getImgMsg(getImgUrl("w01010"),getImgUrl(status));
        setStatus(USER_ID, status);
      }
      else {
        message = {
          "type":"text",
          "text":"...",
          "quickReply": QUICK_REPLY
        }
      }

      sendReplyMessage(REPLY_TOKEN, message);
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


