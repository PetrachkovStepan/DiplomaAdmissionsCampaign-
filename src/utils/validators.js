export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const validateSpecCode = (code) => {
  if (String(code).length > 15 || String(code).length < 8) {
    return null;
  }
  return String(code)
    .toLowerCase()
    .match(/^(\d{1,2}(-\d{2})*)$/);
};

export const validatePhoneNumber = (phoneNumber) => {
  const regex = /^\+375\d{9}$/;
  return regex.test(phoneNumber);
};

export const validateInteger = (input) => {
  const regex = /^[1-9]\d*$/;
  return regex.test(input);
};

export const hasDuplicateSubject = (grades, newGrade) => {
  // Проверяем, есть ли уже предмет с таким же именем в массиве оценок
  return grades.some((grade) => grade.subject === newGrade.subject);
};

export const specCheck = (existingSpecialties, newSpecialty) => {
  const duplicatesByName = [];
  const duplicatesByNumber = [];

  existingSpecialties = existingSpecialties.filter(
    (speciality) => speciality.id !== newSpecialty.id
  );

  // Проверка на совпадение имен в рамках факультета
  const facultySpecialties = existingSpecialties.filter(
    (specialty) => specialty.facultyName === newSpecialty.facultyName
  );

  const isNameDuplicate = facultySpecialties.some(
    (specialty) => specialty.name === newSpecialty.name
  );

  if (isNameDuplicate) {
    duplicatesByName.push(newSpecialty);
  }

  // Проверка на совпадение номеров в рамках всего вуза
  const isNumberDuplicate = existingSpecialties.some(
    (specialty) => specialty.code === newSpecialty.code
  );

  if (isNumberDuplicate) {
    duplicatesByNumber.push(newSpecialty);
  }

  // Вывод результатов
  if (duplicatesByName.length > 0) {
    console.log("Совпадение имен специальностей в рамках факультета:");
    duplicatesByName.forEach((specialty) => {
      console.log(
        `Факультет: ${specialty.facultyName}, Специальность: ${specialty.name}`
      );
    });
  } else {
    console.log(
      "Совпадений имен специальностей в рамках факультета не найдено."
    );
  }

  if (duplicatesByNumber.length > 0) {
    console.log("Совпадение номеров специальностей в рамках вуза:");
    duplicatesByNumber.forEach((specialty) => {
      console.log(`Специальность: ${specialty.name}, Номер: ${specialty.code}`);
    });
  } else {
    console.log("Совпадений номеров специальностей в рамках вуза не найдено.");
  }

  return {
    isNameDuplicate,
    isNumberDuplicate,
  };
};
export const containsSpecById = (arr, id) => {
  return arr.some((obj) => obj.specialityId === id);
};
