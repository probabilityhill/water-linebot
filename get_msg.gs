// 応答メッセージを取得
function getReplyMsg(userId, text){
  let [status, q1, q2, q3] = getStatus(userId, col=6, numRows=1, numCols=4)[0];  // ステータスを取得

  if(text == "start"){
    setStatus(userId, 1);  // F列目にステータス1を設定
    return [getImgMsg(getImgUrl("q1"))];
  }
  else if(text == "water"){  
    return [getImgMsg(getImgUrl(getFilename(status, [q1,q2,q3])))];
  }
  else if(text == "hint"){
    return [getFlexMsg("hint", HINT_LIST[status])];
  }
  else if(text == "rule"){
    return [getFlexMsg("rule", RULE)];
  }
  else if(status >= 1 && status <= 3){  // status1~3の場合
    const isHira = (HIRA_LIST[status-1] == text);
    const isKan = (KAN_LIST[status-1] == text);

    if(isHira || isKan){
      eval("q"+status+" = "+isHira+" ? 0 : 1");
      status += 1
      setStatus(userId, [[status, q1, q2, q3]], col=6, numRows=1, numCols=4);  // ステータスを更新
      if(status === 4){
        // waterと最終問題の画像を返す
        return [getImgMsg(getImgUrl(getFilename(4, [q1,q2,q3]))), getImgMsg(getImgUrl("q4"))];
      }
      return [getImgMsg(getImgUrl("q"+status))];      
    }
  }
  else if(status === 4 && text == "melted"){  // 最終問題正解の場合
    setStatus(userId, 1, col=10);  // 到達を記録
    return [getTextMsg("melted…溶けた…解けた…!"), getImgMsg(getImgUrl("clear")), getFlexMsg("Congratulations!", CLEAR_MSG)];
  }

  return [getTextMsg("...")];
}

// テキストメッセージを取得
function getTextMsg(text){
  return {
    "type":"text",
    "text":text,
    "quickReply": QUICK_REPLY
  };
}

// Flex Messageを取得
function getFlexMsg(label, content){
  return {
    'type':'flex',
    'altText':label,
    'contents':content,
    "quickReply": QUICK_REPLY
  };
}

// 画像メッセージを取得
function getImgMsg(url){
  return {
    "type": "image",
    "originalContentUrl": url,
    "previewImageUrl": url,
    "quickReply": QUICK_REPLY
  };
}