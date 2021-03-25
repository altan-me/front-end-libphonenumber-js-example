// Remember, we're gonna use strict mode in all scripts now!
"use strict";

const debug = true;

// Clean Data before storing (do not run on email value as it wil remove @)
const cleanData = function (value) {
  let cleanValue = value.replace("&", "and").replace(/[!@#$%^*()_+=<>]/g, "");
  return cleanValue;
};

// Phone Validation
const formatPhoneNumber = function (input) {
  const phoneNumber = new libphonenumber.parsePhoneNumber(input, "NZ");
  const phone = {
    phone_number: "",
    transformed_phone: "",
    mobile: "",
    landline: "",
  };
  if (phoneNumber.isValid() && phoneNumber.country === "NZ") {
    const numberType = phoneNumber.getType(); //Used to Determine if number is mobile or landline
    const cleanNumber = cleanData(phoneNumber.number); //Strip + and other symbols

    switch (numberType) {
      case "MOBILE":
        phone.phone_number = phoneNumber.number; //User typed number
        phone.mobile = phone.transformed_phone = cleanNumber; //Set both Mobile & Transformed_phone
        break;
      case "FIXED_LINE" || "UAN":
        phone.phone_number = phoneNumber.number; //User typed number
        phone.landline = phone.transformed_phone = cleanNumber; //Set both landline & transformed_phone
        break;
      default:
        if (debug) {
          console.log(`No match for: ${phoneNumber.number}`);
        }
        // slackMessage(
        //   `DEBUG: Number Did not Match Mobile or Landline ${phoneNumber.number}`
        // );
        break;
    }
    //DEBUG
    if (debug) {
      console.log(`phone_number = ${phone.phone_number}`);
      console.log(`transformed_phone = ${phone.transformed_phone}`);
      console.log(`phone.mobile = ${phone.mobile}`);
      console.log(`phone.landline = ${phone.landline}`);
      console.log(phoneNumber.country);
      console.log(phoneNumber.isValid());
    }

    return phone; //Returns phone Object
  } else {
    console.log("Phone Number not valid");
    return;
  }
};

$(".phone-format").keyup(function () {
  let inputNumber = $(this).val();
  let asYouType = new libphonenumber.AsYouType("NZ");

  asYouType.input(inputNumber);

  console.log(asYouType);
  console.log(asYouType.getNumber());
  console.log(asYouType.isValid());
});

$(".form").submit(function (event) {
  const value = document.getElementById("phone-input").value;
  console.log(value);
  const phone = formatPhoneNumber(value);
  console.log(phone);
});
