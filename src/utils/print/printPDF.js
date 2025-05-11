import printJS from "print-js";

export const printApplicationPDF = (array) => {
  console.log("array");
  console.log(array);

  let outpurArray = "";
  for (let index = 0; index < array.length; index++) {
    outpurArray +=
      "<p>" +
      index +
      1 +
      ". Специальность: " +
      array[index].expand.specialityId.name +
      ", Факультет: " +
      array[index].expand.specialityId.facultyName +
      "</p>";
  }
  // Создаем HTML контент, который будет напечатан
  const htmlContent =
    `
    <div>
      <title>Заявление на поступление в ВУЗ</title>
    <div>
        <h1>Заявление на поступление</h1>
        ` +
    outpurArray +
    `
    </div>
    </div>
    `;

  // Используем printJS для печати HTML контента
  printJS({
    printable: htmlContent,
    type: "raw-html",
    targetStyles: ["*"],
  });
};
