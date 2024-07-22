import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open, rectangle, shell } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            set_variable: {
              name: "hyper",
              value: 1,
            },
          },
        ],
        to_after_key_up: [
          {
            set_variable: {
              name: "hyper",
              value: 0,
            },
          },
        ],
        to_if_alone: [
          {
            key_code: "escape",
          },
        ],
        type: "basic",
      },
    ],
  },
  ...createHyperSubLayers({
    spacebar: open("raycast://script-commands/org-capture"),
    // b = "B"rowse
    b: {
      r: open("https://newsblur.com/"),
      y: open("https://news.ycombinator.com"),
      z: open("https://zeit.de"),
    },
    // d = dev
    d: {
      f: open("https://github.com/umg/dg_stage_admin_frontend"),
      b: open("https://github.com/umg/dg_stage"),
      w: open("https://github.com/umg/dg_stage_web"),
      d: open("https://github.com/umg/dg-stage-deploy"),
    },
    // o = "Open" applications
    o: {
      1: app("1Password"),
      v: app("Visual Studio Code"),
      s: app("Slack"),
      f: app("Finder"),
      // "i"Message
      i: app("Messages"),
      p: app("Spotify"),
      w: app("Warp"),
      h: app("Heynote"),
      b: app("Arc"),
      e: app("Emacs"),
      m: app("Mimestream"),
    },

    // a = AI in Raycast
    a: {
      e: open(
        "raycast://extensions/raycast/raycast-ai/ai-chat?context=%7B%22preset%22:%22B63FF84F-558C-438C-99A7-D0463B897E7D%22%7D"
      ),
      k: open("raycast://extensions/raycast/raycast-ai/ai-chat"),
      s: open(
        "raycast://extensions/raycast/raycast-ai/ai-chat?context=%7B%22preset%22:%222C9C8542-DA60-4E98-ACC8-A927344FC633%22%7D"
      ),
      // r = a*R*chitect
      r: open(
        "raycast://extensions/raycast/raycast-ai/ai-chat?context=%7B%22preset%22:%220378BA6E-604F-4F29-8C60-C5653D62672D%22%7D"
      ),
      t: open(
        "raycast://extensions/raycast/raycast-ai/ai-chat?context=%7B%22preset%22:%22D45969C5-F13F-4655-A146-30E28568EA8E%22%7D"
      ),
      w: open("raycast://ai-commands/summarize-webpage"),
    },
    m: {
      q: open("raycast://extensions/douo/global-media-key/next"),
      a: open("raycast://extensions/douo/global-media-key/play"),
      n: open("raycast://extensions/thomas/spotify-controls/nextTrack"),
      s: open("raycast://extensions/thomas/spotify-controls/playPause"),
    },
    // tab = "Raycast"
    tab: {
      e: open(
        "raycast://extensions/raycast/emoji-symbols/search-emoji-symbols"
      ),
      a: open("raycast://extensions/the-browser-company/arc/search"),
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
