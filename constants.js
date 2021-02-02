module.exports = {
  HALF_STEP: 0.5,
  FLAT_KEYS: ["c", "f", "bb", "eb", "ab", "dd", "gb"],
  SHARP_KEYS: ["c", "g", "d", "a", "e", "b", "f#", "c#", "g#", "d#", "a#"],
  VALUE_TO_NOTE: {
    0: { natural: "c" },
    0.5: { sharp: "c#", flat: "db" },
    1: { natural: "d" },
    1.5: { sharp: "d#", flat: "eb" },
    2: { natural: "e" },
    2.5: { natural: "f" },
    3: { sharp: "f#", flat: "gb" },
    3.5: { natural: "g" },
    4: { sharp: "g#", flat: "ab" },
    4.5: { natural: "a" },
    5: { sharp: "a#", flat: "bb" },
    5.5: { natural: "b" },
  },
  NOTE_TO_VALUE: {
    c: 0,
    "c#": 0.5,
    db: 0.5,
    d: 1,
    "d#": 1.5,
    eb: 1.5,
    e: 2,
    f: 2.5,
    "f#": 3,
    gb: 3,
    g: 3.5,
    "g#": 4,
    ab: 4,
    a: 4.5,
    "a#": 5,
    bb: 5,
    b: 5.5,
  },
};
