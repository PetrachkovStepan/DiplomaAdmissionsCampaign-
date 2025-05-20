import emailjs from "emailjs-com";
export const sendMail = (name, email, title, message) => {
  let params = {
    name: name,
    email: email,
    message: message,
    title: title,
  };
  emailjs
    .send("service_niux0xr", "template_93wkqo8", params, "00N1y-cCv4_9pW8HJ")
    .then(console.log("email send"));
};

// sendMail(
//   users[i].name,
//   "thegreateandpouwerful@gmail.com",
//   "Завершение приема",
//   "Поздравляем, вас зачислили в ВУЗ на специальность:" +
//     choices[j].expand.specialityId.name +
//     ", Факультета: " +
//     choices[j].expand.specialityId.facultyName
// );
