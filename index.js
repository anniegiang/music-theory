const {
  HALF_STEP,
  FLAT_KEYS,
  VALUE_TO_NOTE,
  NOTE_TO_VALUE,
} = require("./constants");

const MAJOR_THIRD = HALF_STEP * 4;
const MINOR_THIRD = HALF_STEP * 3;

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

const getNoteByValue = (value, pitch = "natural") => {
  const notes = VALUE_TO_NOTE[value % 6];
  const note = notes[pitch];
  return note ? note : notes.natural;
};

const getValueByNote = (note) => {
  return NOTE_TO_VALUE[note];
};

const getPitch = (note) => {
  return FLAT_KEYS.includes(note) ? "flat" : "sharp";
};

const getNoteByScaleDegree = (key, degree) => {
  return buildMajorScale(key)[(degree % 7) - 1];
};

const getInversion = (chord, inversion) => {
  const firstInversion = [...chord.slice(1), chord[0]];

  if (inversion === "second") {
    return [...firstInversion.slice(1), firstInversion[0]];
  }

  return firstInversion;
};

const buildMajorScale = (key) => {
  const keyValue = getValueByNote(key);
  const pitch = getPitch(key);

  return Object.values(MAJOR_SCALE).map((degree) => {
    const noteValue = (keyValue + degree) % 6;
    return getNoteByValue(noteValue, pitch);
  });
};

const triad = (note, type) => {
  const scale = buildMajorScale(note);

  let thirdValue = NOTE_TO_VALUE[scale[2]];
  let fifthValue = NOTE_TO_VALUE[scale[4]];

  if (type === "minor" || type === "diminished") {
    thirdValue = NOTE_TO_VALUE[note] + MINOR_THIRD;
  }

  if (type === "diminished") {
    fifthValue = thirdValue + MINOR_THIRD;
  }

  if (type === "augmented") {
    fifthValue = thirdValue + MAJOR_THIRD;
  }

  const pitch = getPitch(note);
  return [
    note,
    getNoteByValue(thirdValue, pitch),
    getNoteByValue(fifthValue, pitch),
  ];
};

const seventhChord = (note, type) => {
  const chord = triad(note, type);
  const pitch = getPitch(note);

  const fifth = NOTE_TO_VALUE[chord[chord.length - 1]];
  let seventh = getNoteByValue(fifth + MINOR_THIRD, pitch);

  if (type === "major") {
    seventh = getNoteByValue(fifth + MAJOR_THIRD, pitch);
  }

  return [...chord, seventh];
};
