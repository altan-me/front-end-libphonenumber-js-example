// Remember, we're gonna use strict mode in all scripts now!
"use strict";

$(".phone-format").keyup(function () {
  let inputNumber = $(this).val();
  let asYouType = new libphonenumber.AsYouType("NZ");

  asYouType.input(inputNumber);

  console.log(asYouType);
  console.log(asYouType.getNumber());
  console.log(asYouType.isValid());
});
