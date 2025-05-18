import { ApiContext } from "@/context/ApiContext";
import { useContext, useEffect } from "react";

//addmission list creation
export function useCreateAddmissionList() {
  const { getListOfEntities, createEntity, getEntityById, updateEntity } =
    useContext(ApiContext);

  const createList = () => {
    createListByForm("дневная", "бюджетная");
  };
  const getAllUsers = async (filter) => {
    const enrollee_data = await getListOfEntities("users", {
      expand: [],
      fields: [],
      page: -1,
      perPage: -1,
      sort: ["score"],
      filter: ["role=2", "approved=true", ...filter],
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
    console.log(specialityId);

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

  //Создание списка по направлениям и формам

  const createListByForm = async (formOfStudy, paymentType) => {
    //получаем пользователей отсортированных по баллам
    const users = await getAllUsers([
      "formOfStudy='" + formOfStudy + "'",
      "paymentType='" + paymentType + "'",
    ]);

    // проходимся по каждому пользователю
    for (let i = 0; i < users.length; i++) {
      const choices = await getAllUserChoices(users[i].id);
      // проходимся по каждому выбору пользователя
      for (let j = 0; j < choices.length; j++) {
        console.log(
          await getAdmissionsCount(
            formOfStudy,
            paymentType,
            choices[j].specialityId
          )
        );

        if (
          (await getAdmissionsCount(
            formOfStudy,
            paymentType,
            choices[j].specialityId
          )) <
          choices[j].expand.specialityId[
            getFieldBasedOnStrings(formOfStudy, paymentType)
          ]
        ) {
          console.log("зачислен");
          return;
        } else {
          continue;
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
