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
    let message;
    if(event.message.type === "text"){
      let text = event.message.text;
      let status = getStatus(USER_ID);  // ステータスを取得
      const ansList = ["あかみ","せんこう","かいせい","し","きり","赤身","線香","快晴","四","霧"];
      const hiraList = ["あかみ","せんこう","かいせい","し","きり"];
      const kanList = ["赤身","線香","快晴","四","霧"];

      // 応答メッセージ
      if(text === "start"){
        setStatus(USER_ID, 1);  // F列目にステータス1を設定
        message = getImgMsg(getImgUrl("q1"));
      }
      else if(text === "water"){
        message = getImgMsg(getImgUrl("q"+status));
      }
      else if(ansList.includes(text)){  // 正解の場合
        if(hiraList.includes(text) && hiraList[status-1] === text){  // ひらがなの場合
          setLetterType(USER_ID, status, 0);
        }
        else if(kanList.includes(text) && kanList[status-1] === text){  // 漢字の場合
          setLetterType(USER_ID, status, 1);
        }
        setStatus(USER_ID, status+1);  // ステータスを更新
        message = getImgMsg(getImgUrl("q"+status));
      }
      else if(status == 6 && text === "ink"){
        message = getImgMsg(getImgUrl(getFilename(USER_ID, 6)),getImgUrl(status));
      }
      else {
        message = [{
          "type":"text",
          "text":"...",
          "quickReply": QUICK_REPLY
        }];
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


