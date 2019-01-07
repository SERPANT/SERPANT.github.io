/**
 * @returns : A string with color code in hex.
 */
function generateRandomColor() {
  const s = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f"
  ];

  let newColor = "#";
  for (let i = 0; i < 6; i++) {
    newColor += s[Math.floor(Math.random() * 14)];
  }
  return newColor;
}
