// 応答メッセージを取得
function getReplyMsg(userId, text){
  let status = getStatus(userId);  // ステータスを取得

  if(text == "start"){
    setStatus(userId, 1);  // F列目にステータス1を設定
    return getImgMsg(getImgUrl("q1"));
  }
  else if(text == "water"){
    return getImgMsg(getImgUrl(getFilename(userId, status)));
  }
  else if(status >= 1 && status <= 5){  // status1~5の場合
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
      return getImgMsg(getImgUrl("q"+status));      
    }
  }
  else if(status == 6 && text == "ink"){
    return getImgMsg(getImgUrl(getFilename(userId, 6)),getImgUrl(status));
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

function getImgMsg(url, url2=""){
  if(url2 === ""){
    return [{
      "type": "image",
      "originalContentUrl": url,
      "previewImageUrl": url,
      "quickReply": QUICK_REPLY
    }];
  }
  else{
    return [{
      "type": "image",
      "originalContentUrl": url,
      "previewImageUrl": url
    },
    {
      "type": "image",
      "originalContentUrl": url2,
      "previewImageUrl": url2,
      "quickReply": QUICK_REPLY
    }];
  }
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