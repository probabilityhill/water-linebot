// 応答メッセージを取得
function getReplyMsg(userId, text){
  let status = getStatus(userId);  // ステータスを取得

  if(text == "start"){
    setStatus(userId, 1);  // F列目にステータス1を設定
    return getImgMsg(getImgUrl("q1"));
  }
  else if(text == "water"){
    return getImgMsg(getImgUrl(getFilename(userId, Math.min(status, 4))));
  }
  else if(text == "hint"){
    return [{
      "type":"text",
      "text":hintList[status],
      "quickReply": QUICK_REPLY
    }];
  }
  else if(status >= 1 && status <= 3){  // status1~3の場合
    const isHira = (hiraList[status-1] == text);
    const isKan = (kanList[status-1] == text);

    if(isHira || isKan){
      if(isHira){  // ひらがなの場合
        setLetterType(userId, status, 0);
      }
      else {  // 漢字の場合
        setLetterType(userId, status, 1);
      }      
      status += 1
      setStatus(userId, status);  // ステータスを更新
      if(status === 4){
        // waterと最終問題の画像を返す
        return getImgMsg(getImgUrl(getFilename(userId, 4)),getImgUrl("q4"));
      }
      return getImgMsg(getImgUrl("q"+status));      
    }
  }
  else if(status === 4 && text == "melted"){  // 最終問題正解の場合
    setLetterType(userId, 4, "#");  // 到達を記録
    status += 1
    setStatus(userId, status);  // ステータスを更新
    return getImgMsg(getImgUrl("clear"), "clearメッセージ", hasText=true);
  }

  return [{
    "type":"text",
    "text":"...",
    "quickReply": QUICK_REPLY
  }];
}

function getFlexMsg(label, content){
  return [{
    'type':'flex',
    'altText':label,
    'contents':content
  }];
}

function getImgMsg(url, second=null, hasText=false){
  if(hasText){  // テキストがある場合
    return [{
      "type": "image",
      "originalContentUrl": url,
      "previewImageUrl": url
    },
    {
      "type":"text",
      "text":second,
      "quickReply": QUICK_REPLY
    }];
  }
  if(second){  // 2つ目の画像がある場合
    return [{
      "type": "image",
      "originalContentUrl": url,
      "previewImageUrl": url
    },
    {
      "type": "image",
      "originalContentUrl": second,
      "previewImageUrl": second,
      "quickReply": QUICK_REPLY
    }];
  }

  return [{
    "type": "image",
    "originalContentUrl": url,
    "previewImageUrl": url,
    "quickReply": QUICK_REPLY
  }];
}

function getLetterTypeMsg(type) {
  let str;
  if(type == 1) {
    str = "漢字";
  }
  else {
    str = "漢字 or ひらがな";
  }
  let content = {
    "type": "bubble",
    "size": "nano",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "contents": [],
          "size": "xxs",
          "weight": "bold",
          "color": "#404040",
          "text": str,
          "align": "center"
        }
      ],
      "paddingAll": "sm"
    }
  };
  return getFlexMsg(str, content)
};