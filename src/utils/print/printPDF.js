import printJS from "print-js";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear().toString().substr(-2);

  const formattedDate = `${day.toString().padStart(2, "0")}.${month.toString().padStart(2, "0")}.${year}`;

  return formattedDate;
};
export const printApplicationPDF = (array, info, educForm, paymentType) => {
  console.log("info");
  console.log(info);

  let outpurArray = "";
  for (let index = 0; index < array.length; index++) {
    outpurArray +=
      "<tr><td> + " +
      educForm +
      ", " +
      paymentType +
      "</td><td>" +
      array[index].expand.specialityId.name +
      ", " +
      array[index].expand.specialityId.facultyName +
      "</td> <td>" +
      (index + 1) +
      "</td> </tr>";
  }
  // Создаем HTML контент, который будет напечатан
  const htmlContent =
    `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>University Admission Application</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 10px;
        }
        .container {
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
            max-width: 800px;
            margin: auto;
        }
            .dataContainer{
            width: 100wh;
            display:flex;
            flex-direction: column;
            justify-content: end;
            align-items: end;
            }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Заявление</h1>
<div class="dataContainer">
        <p>Дата рождения: ` +
    formatDate(info.passport.birthDate) +
    `</p>
        <p>Паспорт: серия ` +
    info.passport.series +
    ` номер ` +
    info.passport.number +
    `</p>
        <p>Кем и когда выдан: ` +
    info.passport.givenByWhom +
    `, ` +
    formatDate(info.passport.givenDate) +
    `</p>
    <div/>
        <p>     Прошу допустить меня _____________________________________________ к участию в конкурсе и сдаче вступительных испытаний для поступления на обучение в Университет в рамках контрольных цифр приема по образовательным программам высшего образования – программам бакалавриата, специалитета.</p>

        <h2>Вступительные испытания</h2>
        <table>
            <thead>
                <tr>
                    <th>Форма обучения</th>
                    <th>Код и наименование образовательной программы</th>
                    <th>Приоритет:</th>
                </tr>
            </thead>
            <tbody>
                ` +
    outpurArray +
    `
            </tbody>
        </table>
    </div>
</body>
</html>`;
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
    <div style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h1 style="width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">ЗАЧИСЛИТЬ НА СООТВЕТСВУЮЩИЕ СПЕЦИАЛЬНОСТИ СООТВЕТСТВУЮЩИХ ФОРМ ОБУЧЕНИЯ СЛЕДУЮЩИХ АБИТУРИЕНТОВ</h1>
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
        "<h2  style='width: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;'>" +
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
