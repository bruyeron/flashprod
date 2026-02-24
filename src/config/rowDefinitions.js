export const ROW_DEFS = [
  {
    type: "section",
    label: "Prévisions"
  },
  {
    type: "sub",
    label: "Prévisions",
    code: "prevision",
    source: "prev::prevision",
    fmt: "number"
  },
  {
    type: "section",
    label: "Volumétrie"
  },
  {
    type: "sub",
    label: "Reçus",
    code: "recu",
    source: "incoming::recu",
    fmt: "number"
  }
]