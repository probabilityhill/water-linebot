// 画像URLを取得
function getImgUrl(filename) {
  return "https://github.com/probabilityhill/water-linebot/blob/main/img/" + filename + ".png?raw=true";
}

// 画像ファイル名を取得
function getFilename(userId, status){
  let str = "";
  if(status === 1){
    return "w0";
  }
  for(let n = 1; n < status; n++){
    str += String(getLetterType(userId, n));
  }
  return "w" + str;
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
  data.getRange(ROW,6+status).setValue(type);  // (F+status)列目にtypeを記入
}
// 文字種を取得
function getLetterType(userId, num){
  const ROW = data.createTextFinder(userId).findNext().getRow();  // ユーザIDが存在する行
  return data.getRange(ROW,6+num).getValue();  // (F+num)列目のtypeを取得
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