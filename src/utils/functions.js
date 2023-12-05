const chooseOne = (arr) => arr[Math.floor(Math.random() * arr.length)];
const rn = (num = 1) => Math.random() * num;
const irn = (num = 10) => Math.floor(Math.random() * num);
const rrn = (a = 0, b = 1) => a + Math.random() * (b - a);
const irrn = (a = 0, b = 1) => Math.floor(a + Math.random() * (b - a));
const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const rnh = (length = 16) => {
  const char = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let hash = "";
  for (let i = 0; i < length; i++) {
    hash += chooseOne(char);
  }
  return hash;
};

const newNumber = (length = 10) => {
  let res = "";
  for (let i = 0; i < length; i++) {
    res += irn(10);
  }
  return res;
};

function getZodiacSign(day, month) {
  // Define the approximate date ranges for each zodiac sign
  const zodiacSigns = [
    { sign: "Capricorn", daterange: [1, 19], month: 0 },
    { sign: "Aquarius", daterange: [20, 49], month: 1 },
    { sign: "Pisces", daterange: [50, 79], month: 2 },
    { sign: "Aries", daterange: [80, 109], month: 3 },
    { sign: "Taurus", daterange: [110, 139], month: 4 },
    { sign: "Gemini", daterange: [140, 169], month: 5 },
    { sign: "Cancer", daterange: [170, 199], month: 6 },
    { sign: "Leo", daterange: [200, 229], month: 7 },
    { sign: "Virgo", daterange: [230, 259], month: 8 },
    { sign: "Libra", daterange: [260, 304], month: 9 },
    { sign: "Scorpio", daterange: [305, 334], month: 10 },
    { sign: "Sagittarius", daterange: [335, 364], month: 11 },
    { sign: "Capricorn", daterange: [365, 372], month: 0 },
  ];

  // Combine the day and month into a single numeric representation
  const numericDate = month * 31 + day;

  // Iterate over the zodiac signs and find the matching sign
  for (const zodiac of zodiacSigns) {
    if (
      numericDate >= zodiac.daterange[0] &&
      numericDate <= zodiac.daterange[1]
    ) {
      return zodiac.sign;
    }
  }

  // Return an empty string if no matching sign is found
  return "";
}

export { getZodiacSign, newNumber, rnh, chooseOne, irn, rn, irrn, char, rrn };
