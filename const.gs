const SCRIPT_PROPERTIES = PropertiesService.getScriptProperties();
const ACCESS_TOKEN = SCRIPT_PROPERTIES.getProperty('ACCESS_TOKEN');

// ユーザ情報を書きこむシート
const SHEET_ID = "1J765HsUk_NcEYsZb7SuJKsRB-eGRTYZVXeDmdBwaeGI";
const SHEET = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];

const HIRA_LIST = ["あかみ","せんこう","かいせい"];
const KAN_LIST = ["赤身","線香","快晴"];
const HINT_LIST = [
  {
    "type": "bubble",
    "size": "nano",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "None.",
          "size": "xs"
        }
      ],
      "paddingAll": "sm",
      "justifyContent": "center",
      "alignItems": "center"
    }
  },
  {
    "type": "bubble",
    "size": "nano",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "🍳",
          "size": "xs"
        }
      ],
      "paddingAll": "sm",
      "justifyContent": "center",
      "alignItems": "center"
    }
  },
  {
    "type": "carousel",
    "contents": [
      {
        "type": "bubble",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "🚬",
              "size": "xs",
              "wrap": true
            }
          ],
          "paddingAll": "md",
          "alignItems": "center",
          "justifyContent": "center"
        }
      },
      {
        "type": "bubble",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "空欄が大きいことから、右に90°回転すると近くで見た■■になると推測できる",
              "size": "xs",
              "wrap": true
            }
          ],
          "paddingAll": "md",
          "alignItems": "center",
          "justifyContent": "center"
        }
      }
    ]
  },
  {
    "type": "bubble",
    "size": "nano",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "🌦️",
          "size": "xs"
        }
      ],
      "paddingAll": "sm",
      "justifyContent": "center",
      "alignItems": "center"
    }
  },
  {
    "type": "carousel",
    "contents": [
      {
        "type": "bubble",
        "size": "kilo",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "3問ともひらがなで解答してきた場合は漢字でも解答してみよう",
              "size": "xs",
              "wrap": true
            }
          ],
          "paddingAll": "md",
          "alignItems": "center",
          "justifyContent": "center"
        }
      },
      {
        "type": "bubble",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "size": "xs",
              "wrap": true,
              "text": "状況がつかめない場合は1問解答するごとに水の状態を確認してみよう"
            }
          ],
          "paddingAll": "md",
          "alignItems": "center",
          "justifyContent": "center"
        },
        "size": "kilo"
      },
      {
        "type": "bubble",
        "size": "kilo",
        "body": {
          "type": "box",
          "layout": "vertical",
          "contents": [
            {
              "type": "text",
              "text": "答えは6文字の英単語になる",
              "size": "xs",
              "wrap": true
            }
          ],
          "paddingAll": "sm",
          "alignItems": "center",
          "justifyContent": "center"
        }
      }
    ]
  },
  {
    "type": "bubble",
    "size": "nano",
    "body": {
      "type": "box",
      "layout": "vertical",
      "contents": [
        {
          "type": "text",
          "text": "None.",
          "size": "xs"
        }
      ],
      "paddingAll": "sm",
      "justifyContent": "center",
      "alignItems": "center"
    }
  }
];

const CLEAR_MSG = {
  "type": "bubble",
  "size": "kilo",
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": "Congratulations!",
        "weight": "bold",
        "size": "lg",
        "color": "#404040"
      },
      {
        "type": "box",
        "layout": "vertical",
        "margin": "lg",
        "contents": [
          {
            "type": "text",
            "text": "クリアツイートは以下のボタンからお願いいたします。（エクストラ要素はありません。）",
            "color": "#404040",
            "wrap": true,
            "size": "sm"
          }
        ]
      }
    ],
    "paddingBottom": "none"
  },
  "footer": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "button",
        "action": {
          "type": "uri",
          "label": "TWEET",
          "uri": "https://twitter.com/intent/tweet?text=LINE%E8%AC%8E%E3%80%8Ewater%E3%80%8Fclear!%0A%0Aplay%EF%BC%88%E3%82%B9%E3%83%9E%E3%83%BC%E3%83%88%E3%83%95%E3%82%A9%E3%83%B3%E7%89%88%E3%81%AE%E3%81%BF%EF%BC%89%20%E2%86%92%20https%3A%2F%2Flin.ee%2FPMyXCdw%0A%0A%23water%E8%AC%8E%20%23LINE%E8%AC%8E%20%40TM_TryAngle"
        },
        "height": "sm",
        "color": "#00acee",
        "style": "primary"
      },
      {
        "type": "box",
        "layout": "vertical",
        "contents": [],
        "margin": "sm"
      }
    ]
  }
};
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
