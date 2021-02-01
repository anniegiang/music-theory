const HALF_STEP = 0.5;

const MAJOR_THIRD = HALF_STEP * 4;
const MINOR_THIRD = HALF_STEP * 3;

const SHARP_KEYS = ["c", "g", "d", "a", "e", "b", "f#", "c#", "g#", "d#", "a#"];
const FLAT_KEYS = ["c", "f", "bb", "eb", "ab", "dd", "gb"];

const MAJOR_SCALE = {
  0: 0, // 1
  1: HALF_STEP * 2, // 2
  2: HALF_STEP * 4, // 3
  3: HALF_STEP * 5, // 4
  4: HALF_STEP * 7, // 5
  5: HALF_STEP * 9, // 6
  6: HALF_STEP * 11, // 7
  7: 0, // 8
};

const NOTE_TO_VALUE = {
  c: 0,
  "c#": 0.5,
  d: 1,
  "d#": 1.5,
  e: 2,
  f: 2.5,
  "f#": 3,
  g: 3.5,
  "g#": 4,
  a: 4.5,
  "a#": 5,
  b: 5.5,
};

const VALUE_TO_NOTE = {
  0: "c",
  0.5: "c#",
  1: "d",
  1.5: "d#",
  2: "e",
  2.5: "f",
  3: "f#",
  3.5: "g",
  4: "g#",
  4.5: "a",
  5: "a#",
  5.5: "b",
};

const getNoteByValue = (value) => {
  return VALUE_TO_NOTE[value % 6];
};

const buildMajorScale = (key) => {
  return Object.values(MAJOR_SCALE).map((degree) =>
    getNoteByValue(NOTE_TO_VALUE[key] + degree)
  );
};

const getNoteByKeyDegree = (key, degree) => {
  return buildMajorScale(key)[(degree % 7) - 1];
};

const triad = (note, type) => {
  const scale = buildMajorScale(note);

  let thirdValue = NOTE_TO_VALUE[scale[2]];

  if (type === "minor" || type === "diminished") {
    thirdValue = NOTE_TO_VALUE[note] + MINOR_THIRD;
  }

  let fifthValue = NOTE_TO_VALUE[scale[4]];

  if (type === "diminished") {
    fifthValue = thirdValue + MINOR_THIRD;
  }

  if (type === "augmented") {
    fifthValue = thirdValue + MAJOR_THIRD;
  }

  return [scale[0], getNoteByValue(thirdValue), getNoteByValue(fifthValue)];
};

const seventhChord = (note, type) => {
  const triad = triad(note, type);

  const fifth = NOTE_TO_VALUE[triad[triad.length - 1]];
  let seventh = getNoteByValue(fifth + MINOR_THIRD);

  if (type === "major") {
    seventh = getNoteByValue(fifth + MAJOR_THIRD);
  }

  return [...triad, seventh];
};
