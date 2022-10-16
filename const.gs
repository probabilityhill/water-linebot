const hiraList = ["あかみ","せんこう","かいせい"];
const kanList = ["赤身","線香","快晴"];

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
