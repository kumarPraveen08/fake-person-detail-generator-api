import {
  Colors,
  Professions,
  TempMail,
  TLD,
  Month,
  BloodType,
  Agent,
} from "../_data/index.js";
import {
  char,
  chooseOne,
  getZodiacSign,
  irn,
  irrn,
  newNumber,
  rn,
  rnh,
  rrn,
} from "./functions.js";

function usePerson(data, gender, age) {
  let tempMail = chooseOne(TempMail);
  let month = chooseOne(Month);
  let monthInNumber = Month.indexOf(month);
  let day = month === "February" ? irrn(1, 28) : irrn(1, 31);
  let currentYear = new Date().getFullYear();
  let year = currentYear - age;
  let card = chooseOne(data.cards);
  let cardExpiryYear = currentYear + irrn(3, 8);
  let carYear = currentYear - irn(8);
  let zodiacSign = getZodiacSign(day, monthInNumber);

  // PERSON NAME
  const firstname =
    gender === "male" ? chooseOne(data.maleNames) : chooseOne(data.femaleNames);
  const lastname = chooseOne(data.surnames);
  const middlename = "";
  const surname = lastname;
  const fullname = `${firstname} ${lastname}`;

  // PERSON ADDRESS
  const house = `0${irn(45)}`;
  const block = chooseOne(char);
  const pincode = "123234";
  const state = chooseOne(data.states);
  const stateName = state.name;
  const city = chooseOne(state.cities);
  const country = data.name;
  const full_address = `${house}${block} ${city} ${pincode} ${stateName}, ${country}`;

  const countryDetails = {
    name: data.name,
    country_code: data.countryCode,
    language: data.language,
    currency: data.currency,
  };

  const phone = {
    code: data.phoneCode,
    number: newNumber(10),
  };

  const birth = {
    age: `${age}`,
    day: `${day}`,
    month,
    year: `${year}`,
    birthday: `${day} ${month} ${year}`,
    place: city + " " + stateName,
    zodaic: zodiacSign,
  };

  const rnBrowser = chooseOne(Agent.browsers);
  const rnOS = chooseOne(Agent.os);
  const rnUserAgentString = chooseOne(Agent.userAgentStrings);

  const userAgent = rnUserAgentString
    .replace("{os}", rnOS)
    .replace("{browser}", rnBrowser);
  const online = {
    email: `${firstname}${surname}@${tempMail}`,
    username: `${irn(1000)}${rn() < 0.5 ? "#" : "$"}${
      rn() < 0.5 ? firstname : surname
    }${rn() < 0.5 ? "$" : "@"}${irn(1000)}`,
    password: `${irn(1000)}@${surname}${rn() < 0.5 ? "." : "$"}${irn(
      1000
    )}#${firstname}`,
    domain: `${rn() < 0.5 ? firstname : surname}.${chooseOne(
      TLD
    )}`.toLowerCase(),
    uuid: rnh(16),
    user_agent: userAgent,
  };

  const finance = {
    card: {
      name: card,
      number: `${newNumber(4)} ${newNumber(4)} ${newNumber(4)} ${newNumber(4)}`,
      expires: `${cardExpiryYear}`,
      cvv: newNumber(3),
    },
  };

  const employment = {
    company: chooseOne(data.companies),
    profession: chooseOne(Professions),
  };

  const hIn =
    gender === "male" ? rrn(4.9, 6.5).toFixed(1) : rrn(4, 6).toFixed(1);
  const hCM = hIn * 30.48;
  const physical = {
    height: `${hIn} (${Math.ceil(hCM)} Centimeters)`,
    weight: `${irrn(40, 70)}`,
    bloodType: chooseOne(BloodType),
  };

  const vehicle = {
    brand: chooseOne(data.carCompanies),
    model: `${chooseOne(char)}${irn(10)}`,
    year: `${carYear}`,
    fuelCount: rn() < 0.5 ? "Petrol" : "Diesel",
  };

  const other = {
    favorite_color: chooseOne(Colors),
  };

  return {
    firstname,
    middlename,
    surname,
    fullname,
    gender,
    full_address,
    phone,
    birth,
    online,
    employment,
    physical,
    finance,
    vehicle,
    countryDetails,
    other,
  };
}

export { usePerson };
