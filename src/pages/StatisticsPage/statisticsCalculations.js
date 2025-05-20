export const calculateAverageScore = (records) => {
  if (!records || records.length === 0) {
    return 0;
  }

  const totalScore = records.reduce(
    (sum, record) => sum + record.expand.userId.score,
    0
  );
  const averageScore = totalScore / records.length;
  return averageScore;
};
export const filterByFaculty = (records, facultyName) => {
  return records.filter(
    (record) => record.expand.specialityId.facultyName == facultyName
  );
};
export const filterBySpeciality = (records, name) => {
  return records.filter((record) => record.expand.specialityId.name == name);
};
export const extractFacultyData = (records) => {
  const facultyCounts = {};

  // Подсчет количества абитуриентов для каждого факультета
  records.forEach((record) => {
    const facultyName = record.expand.specialityId.facultyName;
    if (facultyCounts[facultyName]) {
      facultyCounts[facultyName]++;
    } else {
      facultyCounts[facultyName] = 1;
    }
  });

  // Извлечение названий факультетов и количества абитуриентов в отдельные массивы
  const facultyNames = Object.keys(facultyCounts);
  const applicantCounts = facultyNames.map(
    (facultyName) => facultyCounts[facultyName]
  );
  return {
    facultyNames,
    applicantCounts,
  };
};
export const extractStudyFormData = (records) => {
  const studyFormCounts = {};

  // Подсчет количества абитуриентов для каждой формы обучения
  records.forEach((record) => {
    const studyForm = record.expand.userId.formOfStudy;
    if (studyFormCounts[studyForm]) {
      studyFormCounts[studyForm]++;
    } else {
      studyFormCounts[studyForm] = 1;
    }
  });

  // Извлечение форм обучения и количества абитуриентов в отдельные массивы
  const studyForms = Object.keys(studyFormCounts);
  const applicantCounts = studyForms.map(
    (studyForm) => studyFormCounts[studyForm]
  );
  return {
    studyForms,
    applicantCounts,
  };
};

export const getScoreDistributionByDecade = (records) => {
  const decadeCounts = {};

  // Подсчет количества студентов для каждого десятка баллов
  records.forEach((record) => {
    const score = record.expand.userId.score;
    const decade = Math.floor(score / 10) * 10; // Округление до ближайшего десятка

    if (decadeCounts[decade]) {
      decadeCounts[decade]++;
    } else {
      decadeCounts[decade] = 1;
    }
  });

  // Сортировка десятков
  const sortedDecades = Object.keys(decadeCounts).sort((a, b) => a - b);

  // Создание массивов для десятков и количества студентов
  const decades = sortedDecades.map((decade) => parseInt(decade, 10));
  const counts = sortedDecades.map((decade) => decadeCounts[decade]);

  return {
    decades,
    counts,
  };
};
