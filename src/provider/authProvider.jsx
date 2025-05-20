/* eslint-disable react/prop-types */
import axios from "axios";
import { useCookies } from "react-cookie";
import { AuthContext } from "../context/AuthContext";
import { get } from "lodash";
import { useAntNotification } from "../utils/notification";

const AuthProvider = ({ children }) => {
  const [_, setCookie, removeCookie] = useCookies(["auth-token", "user-role"]);
  const { antNotification, contextHolder } = useAntNotification();

  const authenticate = async ({ email, password }) => {
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8090/api/collections/users/auth-with-password",
        { identity: email, password: password }
      );
      let emloyeeData = { blocked: false };

      if (data.record.role != 2) {
        emloyeeData = (
          await axios.get(
            "http://127.0.0.1:8090/api/collections/UniversityEmployeeInfo/records"
          )
        ).data.items;
        emloyeeData = emloyeeData.filter(
          (item) => item.userId === data.record.id
        )[0];
      }
      setCookie("user-blocked", get(emloyeeData, "blocked"), {
        expires: new Date(Date.now() + 12096e5),
      });
      setCookie("user-approved", get(data, "record.approved"), {
        expires: new Date(Date.now() + 12096e5),
      });
      setCookie("user-enrollled", get(data, "record.enrollled"), {
        expires: new Date(Date.now() + 12096e5),
      });
      setCookie("user-isCompleted", get(data, "record.isCompleted"), {
        expires: new Date(Date.now() + 12096e5),
      });
      setCookie("auth-token", get(data, "token"), {
        expires: new Date(Date.now() + 12096e5),
      });
      setCookie("user-role", get(data, "record.role"), {
        expires: new Date(Date.now() + 12096e5),
      });
      setCookie("user-id", get(data, "record.id"), {
        expires: new Date(Date.now() + 12096e5),
      });
    } catch {
      antNotification({
        type: "error",
        customTitle: "Failure",
        customMessage: "Invalid credentials",
      });
    }
  };

  const register = async ({ email, password, name }) => {
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:8090/api/collections/users/records",
        {
          email: email,
          password: password,
          passwordConfirm: password,
          name: name,
          role: 2,
        }
      );
      await axios.post(
        "http://127.0.0.1:8090/api/collections/Passport/records",
        {
          userId: data.id,
          idNum: "",
          series: "",
          number: "",
          nameLat: "",
          nameKir: "",
          sex: "male",
          city: "",
          birthDate: "2022-01-01 10:00:00.123Z",
          givenDate: "2022-01-01 10:00:00.123Z",
          givenByWhom: "",
        }
      );
      await axios.post(
        "http://127.0.0.1:8090/api/collections/EducationCertificate/records",
        {
          userId: data.id,
          score: 0,
          documentName: "",
          scoolType: "",
          schoolName: "",
          releaseDate: "2022-01-01 10:00:00.123Z",
          foreighnLanguage: "English",
          educationType: "",
        }
      );
      // setCookie("auth-token", get(data, "token"), {
      //   expires: new Date(Date.now() + 12096e5),
      // });
      // setCookie("user-role", get(data, "record.role"), {
      //   expires: new Date(Date.now() + 12096e5),
      // });
      // setCookie("user-id", get(data, "record.id"), {
      //   expires: new Date(Date.now() + 12096e5),
      // });
    } catch {
      antNotification({
        type: "error",
        customTitle: "Failure",
        customMessage: "Пользователь с таким email уже существует",
      });
    }
    authenticate({ email: email, password: password });
  };

  const unAuthenticate = () => {
    removeCookie("auth-token");
  };

  const contextData = {
    authenticate,
    unAuthenticate,
    register,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {contextHolder}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
