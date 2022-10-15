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
      "previewImageUrl": url
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
      "previewImageUrl": url2
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