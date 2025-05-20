import { ApiContext } from "@/context/ApiContext";
import { sendMail } from "@/utils/email/email";
import { useContext } from "react";

//addmission list creation
export function useCreateAddmissionList() {
  const { getListOfEntities, createEntity, updateEntity } =
    useContext(ApiContext);

  const createList = async () => {
    //дневная бюджетная
    await createListByForm("дневная", "бюджетная", [0]);
    await createListByForm("дневная", "бюджетная", [1, 2, 3]);

    // // //дневная платная
    await createListByForm("дневная", "платная", [0]);
    await createListByForm("дневная", "платная", [1, 2, 3]);

    // // //заочная бюджетная
    await createListByForm("заочная", "бюджетная", [0]);
    await createListByForm("заочная", "бюджетная", [1, 2, 3]);

    // // //заочная платная
    await createListByForm("заочная", "платная", [0]);
    await createListByForm("заочная", "платная", [1, 2, 3]);

    // // //дистанционная бюджетная
    await createListByForm("дистанционная", "бюджетная", [0]);
    await createListByForm("дистанционная", "бюджетная", [1, 2, 3]);

    // // //дистанционная платная
    await createListByForm("дистанционная", "платная", [0]);
    await createListByForm("дистанционная", "платная", [1, 2, 3]);
  };
  const getAllUsers = async (filter) => {
    const enrollee_data = await getListOfEntities("users", {
      expand: [],
      fields: [],
      page: -1,
      perPage: -1,
      sort: ["-score"],
      filter: ["role=2", "isCompleted=false", "approved=true", ...filter],
      skipTotal: -1,
    });
    return enrollee_data.data.items;
  };
  const getAllUserChoices = async (userId) => {
    const choice_data = await getListOfEntities("ChoiceListItem", {
      expand: ["specialityId"],
      fields: [],
      page: -1,
      perPage: -1,
      sort: ["priority"],
      filter: ["userId='" + userId + "'"],
      skipTotal: -1,
    });
    return choice_data.data.items;
  };
  const getAdmissionsCount = async (formOfStudy, paymentType, specialityId) => {
    const admission_data = (
      await getListOfEntities("AdmissionListItem", {
        expand: ["userId"],
        fields: [],
        page: -1,
        perPage: -1,
        sort: [],
        filter: ["specialityId='" + specialityId + "'"],
        skipTotal: -1,
      })
    ).data.items;
    return admission_data.filter(
      (item) =>
        (item.expand.userId.formOfStudy === formOfStudy) &
        (item.expand.userId.paymentType === paymentType)
    ).length;
  };
  const createListItem = async (userId, specialityId) => {
    await createEntity("AdmissionListItem", {
      userId: userId,
      specialityId: specialityId,
    });
  };
  const getStudented = async (userId) => {
    await updateEntity("users", userId, { isCompleted: true });
  };

  //Создание списка по направлениям и формам

  const createListByForm = async (formOfStudy, paymentType, category) => {
    let categoryRequest = "";
    let benefitControlCount = 1;
    let users = [];
    if (category.length == 1) {
      categoryRequest = "category=" + category[0];
      benefitControlCount = 3;
      users = await getAllUsers([
        "formOfStudy='" + formOfStudy + "'",
        "paymentType='" + paymentType + "'",
        categoryRequest,
      ]);
    } else {
      users = await getAllUsers([
        "formOfStudy='" + formOfStudy + "'",
        "paymentType='" + paymentType + "'",
      ]);
      // categoryRequest = `category=0 || category=1 || category=2 || category=3`;
    }
    //получаем пользователей отсортированных по баллам
    // const users = await getAllUsers([
    //   "formOfStudy='" + formOfStudy + "'",
    //   "paymentType='" + paymentType + "'",
    //   categoryRequest,
    // ]);
    console.log(users);

    if (category.length > 1) {
      // console.log("sorting...");

      users.sort((a, b) => {
        // Если баллы не равны, сортируем по убыванию баллов
        if (a.score !== b.score) {
          return b.score - a.score;
        }
        // Если баллы равны, категория 1 должна стоять выше
        if (a.category === 1) {
          return -1;
        }
        if (b.category === 1) {
          return 1;
        }
        // Если категории не равны 1, оставляем порядок без изменений
        return 0;
      });
    }
    console.log(users);

    // проходимся по каждому пользователю
    for (let i = 0; i < users.length; i++) {
      const choices = await getAllUserChoices(users[i].id);
      // проходимся по каждому выбору пользователя

      for (let j = 0; j < choices.length; j++) {
        if (
          (await getAdmissionsCount(
            formOfStudy,
            paymentType,
            choices[j].specialityId
          )) <
          Math.floor(
            choices[j].expand.specialityId[
              getFieldBasedOnStrings(formOfStudy, paymentType)
            ] / benefitControlCount
          )
        ) {
          console.log(Math.floor(benefitControlCount));

          await createListItem(choices[j].userId, choices[j].specialityId);
          await getStudented(choices[j].userId);
          console.log("зачислен");
          sendMail(
            users[i].name,
            users[i].email,
            "Завершение приема",
            "Поздравляем, вас зачислили в ВУЗ на Cпециальность: " +
              choices[j].expand.specialityId.name +
              ", Факультета: " +
              choices[j].expand.specialityId.facultyName
          );
          break;
        } else {
          if (j >= choices.length - 1) {
            console.log("отчислен");
            break;
          }
        }
      }
    }
  };
  function getFieldBasedOnStrings(form, payment) {
    // Используем объект для сопоставления значений строк с полями
    const fieldMap = {
      дневная: {
        бюджетная: "fullTimeBudgetPlaces",
        платная: "fullTimePaidPlaces",
      },
      заочная: {
        бюджетная: "partTimeBudgetPlaces",
        платная: "partTimePaidPlaces",
      },
      дистанционная: {
        бюджетная: "distanceBudgetPlaces",
        платная: "distancePaidPlaces",
      },
    };

    // Проверяем наличие значений в объекте
    if (fieldMap[form] && fieldMap[form][payment]) {
      return fieldMap[form][payment];
    } else {
      // Возвращаем значение по умолчанию или обрабатываем ошибку
      return "Поле не найдено"; // или любое другое значение по умолчанию
    }
  }
  return { createList };
}
