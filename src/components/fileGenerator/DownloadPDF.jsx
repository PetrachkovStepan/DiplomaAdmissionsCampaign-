import printJS from "print-js";

const DownloadPDF = () => {
  const printPDF = () => {
    // Создаем HTML контент, который будет напечатан
    const htmlContent = `
    <!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>University Admission Application</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 20px;
        }
        .container {
            max-width: 800px;
            margin: auto;
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
        <form>
            <label for="name">Фамилия, имя, отчество поступающего:</label><br>
            <input type="text" id="name" name="name"><br><br>

            <label for="birthdate">Дата рождения:</label>
            <input type="date" id="birthdate" name="birthdate"><br><br>

            <label for="passport">Паспорт: серия и номер</label>
            <input type="text" id="passport" name="passport"><br><br>

            <label for="snils">СНИЛС:</label>
            <input type="text" id="snils" name="snils"><br><br>

            <label for="email">Почтовый (электронный) адрес:</label>
            <input type="email" id="email" name="email"><br><br>

            <label for="phone">Контактные телефоны:</label>
            <input type="tel" id="phone" name="phone"><br><br>

            <h2>Вступительные испытания</h2>
            <table>
                <thead>
                    <tr>
                        <th>Форма обучения</th>
                        <th>Код и наименование образовательной программы</th>
                        <th>Приоритет целевой квоты</th>
                        <th>Вступительные испытания</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="checkbox" id="fulltime" name="fulltime"> очная</td>
                        <td><input type="text"></td>
                        <td>
                            <select>
                                <option value="none">нет</option>
                                <option value="special">особая квота</option>
                                <option value="general">общая квота</option>
                            </select>
                        </td>
                        <td>
                            1. <input type="text"><br>
                            2. <input type="text"><br>
                            3. <input type="text">
                        </td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" id="parttime" name="parttime"> заочная</td>
                        <td><input type="text"></td>
                        <td>
                            <select>
                                <option value="none">нет</option>
                                <option value="special">особая квота</option>
                                <option value="general">общая квота</option>
                            </select>
                        </td>
                        <td>
                            1. <input type="text"><br>
                            2. <input type="text"><br>
                            3. <input type="text">
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
</body>
</html>
    `;

    // Используем printJS для печати HTML контента
    printJS({
      printable: htmlContent,
      type: "raw-html",
      targetStyles: ["*"],
    });
  };

  return (
    <div>
      <button onClick={printPDF}>Напечатать PDF</button>
    </div>
  );
};

export default DownloadPDF;
