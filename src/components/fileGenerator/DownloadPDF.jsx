import printJS from "print-js";

const DownloadPDF = () => {
  const printPDF = () => {
    // Создаем HTML контент, который будет напечатан
    const htmlContent = `
    <div>
      <title>Заявление на поступление в ВУЗ</title>
    <div>
        <h1>Заявление на поступление</h1>
        <p>Список специальностей и факультетов:</p>
        <p>1. Специальность: AAAA, Факультет: AAA1</p>
        <p>2. Специальность: AAAA, Факультет: AAA1</p>
        <p>3. Специальность: AAAA, Факультет: AAA1</p>
        <p>4. Специальность: AAAA, Факультет: AAA1</p>
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

  return (
    <div>
      <button onClick={printPDF}>Напечатать PDF</button>
    </div>
  );
};

export default DownloadPDF;
