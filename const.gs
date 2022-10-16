const HIRA_LIST = ["あかみ","せんこう","かいせい"];
const KAN_LIST = ["赤身","線香","快晴"];
const HINT_LIST = ["None.", "ミ","🚬","🌦️","answer: ○○○○○○", "None."];
const RULE = {
  "type": "bubble",
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "rule",
            "weight": "bold",
            "color": "#404040",
            "size": "lg"
          }
        ]
      },
      {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": [
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "・ 答えはひらがなまたは漢字で送信",
                "size": "sm",
                "color": "#404040",
                "offsetBottom": "xs",
                "margin": "xs"
              },
              {
                "type": "text",
                "text": "・ 3問解くと水と最終問題が送られてくる",
                "size": "sm",
                "color": "#404040"
              },
              {
                "type": "text",
                "text": "・ 最終問題に正解するとクリア",
                "size": "sm",
                "color": "#404040",
                "offsetTop": "xs"
              }
            ],
            "margin": "sm"
          }
        ]
      },
      {
        "type": "separator",
        "margin": "lg"
      },
      {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "ボタンの機能",
            "weight": "bold",
            "color": "#666666",
            "size": "sm"
          }
        ],
        "paddingTop": "md",
        "paddingBottom": "sm",
        "paddingStart": "sm"
      },
      {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": [
          {
            "type": "box",
            "layout": "baseline",
            "spacing": "sm",
            "contents": [
              {
                "type": "text",
                "text": "start",
                "color": "#aaaaaa",
                "size": "sm",
                "flex": 1,
                "weight": "bold"
              },
              {
                "type": "text",
                "text": "スタート / やり直し",
                "wrap": true,
                "color": "#404040",
                "size": "sm",
                "flex": 4
              }
            ]
          },
          {
            "type": "box",
            "layout": "baseline",
            "spacing": "sm",
            "contents": [
              {
                "type": "text",
                "text": "water",
                "color": "#aaaaaa",
                "size": "sm",
                "flex": 1,
                "weight": "bold"
              },
              {
                "type": "text",
                "text": "水の状態を確認する",
                "wrap": true,
                "color": "#404040",
                "size": "sm",
                "flex": 4
              }
            ]
          },
          {
            "type": "box",
            "layout": "baseline",
            "spacing": "sm",
            "contents": [
              {
                "type": "text",
                "text": "hint",
                "color": "#aaaaaa",
                "size": "sm",
                "flex": 1,
                "weight": "bold"
              },
              {
                "type": "text",
                "text": "ヒントを見る",
                "wrap": true,
                "color": "#404040",
                "size": "sm",
                "flex": 4
              }
            ]
          },
          {
            "type": "box",
            "layout": "baseline",
            "spacing": "sm",
            "contents": [
              {
                "type": "text",
                "text": "rule",
                "color": "#aaaaaa",
                "size": "sm",
                "flex": 1,
                "weight": "bold"
              },
              {
                "type": "text",
                "text": "ルールを確認する",
                "wrap": true,
                "color": "#404040",
                "size": "sm",
                "flex": 4
              }
            ]
          },
          {
            "type": "box",
            "layout": "baseline",
            "spacing": "sm",
            "contents": [
              {
                "type": "text",
                "text": "contact",
                "color": "#aaaaaa",
                "size": "sm",
                "flex": 1,
                "weight": "bold"
              },
              {
                "type": "text",
                "text": "不具合等を報告する",
                "wrap": true,
                "color": "#404040",
                "size": "sm",
                "flex": 4
              }
            ]
          }
        ],
        "paddingStart": "md"
      }
    ],
    "paddingAll": "lg"
  }
};

const QUICK_REPLY = {
  "items": [
    {
      "type": "action",
      "action": {
        "type": "message",
        "label": "start",
        "text": "start"
      }
    },
    {
      "type": "action",
      "action": {
        "type": "message",
        "label": "water",
        "text": "water"
      }
    },
    {
      "type": "action",
      "action": {
        "type": "message",
        "label": "hint",
        "text": "hint"
      }
    },
    {
      "type": "action",
      "action": {
        "type": "message",
        "label": "rule",
        "text": "rule"
      }
    },    
    {
      "type": "action",
      "action": {
        "type": "uri",
        "label": "contact",
        "uri": "https://twitter.com/TM_TryAngle"
      }
    }
  ]
};
