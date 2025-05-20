import printJS from "print-js";

export const printApplicationPDF = (array) => {
  console.log("array");
  console.log(array);

  let outpurArray = "";
  for (let index = 0; index < array.length; index++) {
    outpurArray +=
      "<p>" +
      (index + 1) +
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

export const printAddmissionListPDF = (array) => {
  const outputArray = createAddmissionArray(sortAddmissionArray(array));
  // Создаем HTML контент, который будет напечатан
  const htmlContent =
    `
    <div>
      <title>ЗАЧИСЛИТЬ НА СООТВЕТСВУЮЩИЕ СПЕЦИАЛЬНОСТИ СООТВЕТСТВУЮЩИХ ФОРМ ОБУЧЕНИЯ СЛЕДУЮЩИХ АБИТУРИЕНТОВ </title>
    <div>
        <h1>ЗАЧИСЛИТЬ НА СООТВЕТСВУЮЩИЕ СПЕЦИАЛЬНОСТИ СООТВЕТСТВУЮЩИХ ФОРМ ОБУЧЕНИЯ СЛЕДУЮЩИХ АБИТУРИЕНТОВ</h1>
        ` +
    outputArray +
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

const createAddmissionArray = (array) => {
  console.log(array);

  let outputArray = "";
  for (let index = 0; index < array.length; index++) {
    if (
      array[index].expand.specialityId.name !=
      array[index - 1]?.expand.specialityId.name
    ) {
      outputArray +=
        "<h2>" +
        "Специальность: " +
        array[index].expand.specialityId.name +
        ", Факультет: " +
        array[index].expand.specialityId.facultyName +
        "</h2>";
    }
    outputArray +=
      "<p>" + (index + 1) + ". " + array[index].expand.userId.name + "</p>";
  }
  return outputArray;
};
const sortAddmissionArray = (array) => {
  return array.sort((a, b) => {
    // Сначала сравниваем по facultyName
    if (a.expand.specialityId.facultyName < b.expand.specialityId.facultyName) {
      return -1;
    }
    if (a.expand.specialityId.facultyName > b.expand.specialityId.facultyName) {
      return 1;
    }

    // Если facultyName одинаковы, сравниваем по name
    if (a.expand.specialityId.name < b.expand.specialityId.name) {
      return -1;
    }
    if (a.expand.specialityId.name > b.expand.specialityId.name) {
      return 1;
    }

    return 0;
  });
};
