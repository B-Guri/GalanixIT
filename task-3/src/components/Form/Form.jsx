import React, { useEffect, useMemo, useState } from "react";
import Service from "../../API/Service";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Loader from "../Loader/Loader";
import cl from "./Form.module.css";

const Form = () => {
  const [input, setInput] = useState("");
  const [universities, setUniversities] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [errorInput, setErrorInput] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  let savedUniversities = JSON.parse(localStorage.getItem("saved")) || [];

  useEffect(() => {
    const lastSearch = localStorage.getItem("lastSearch");
    if (lastSearch && lastSearch.length > 0) {
      getInfo(lastSearch);
      setInput(lastSearch);
      setSavedCount(savedUniversities.length);
    }
  }, []);

  const getInfo = async (lastSearch) => {
    if (input.length <= 0 && !lastSearch) {
      setErrorInput(true);
    } else {
      if (!isLoading) {
        setLoading(true);
        const result = await Service.getInfo(
          lastSearch ? lastSearch : input,
          "university"
        );
        setUniversities(result);
        setLoading(false);
        localStorage.setItem("lastSearch", lastSearch ? lastSearch : input);
      }
    }
  };

  const resetInfo = () => {
    setInput("");
    setUniversities([]);
    localStorage.clear();
    setSavedCount(0);
  };

  const isExistInStorage = (name) => {
    let isExist = false;
    if (savedUniversities) {
      for (let i = 0; i < savedUniversities.length; i++) {
        if (name === savedUniversities[i]) {
          isExist = true;
        }
      }
    }
    return isExist;
  };

  const saveHandleChange = (name) => {
    let isExist = isExistInStorage(name);
    if (isExist) {
      savedUniversities = savedUniversities.filter((uName) => uName !== name);
      setUniversities([
        ...universities.map((university) =>
          university.name === name
            ? { ...university, checked: false }
            : { ...university }
        ),
      ]);
    } else {
      savedUniversities.push(name);
      setUniversities([
        ...universities.map((university) =>
          university.name === name
            ? { ...university, checked: true }
            : { ...university }
        ),
      ]);
    }
    localStorage.setItem("saved", JSON.stringify(savedUniversities));
    setSavedCount(savedUniversities.length);
  };

  return (
    <div className={cl.content}>
      <div className={cl.saved_count}>
        <p>Загальна кількість збережених університетів: {savedCount}</p>
      </div>
      <div className={cl.form_container}>
        <Input
          isError={errorInput}
          type="text"
          placeholder="Країна(англійською)..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onFocus={() => {
            setErrorInput(false);
          }}
        />
        <div className={cl.buttons}>
          <Button
            onClick={() => {
              getInfo();
            }}
            disabled={isLoading}
          >
            Відправити
          </Button>
          <Button disabled={isLoading} onClick={resetInfo}>
            Скинути
          </Button>
        </div>
      </div>
      <div className={cl.table_content}>
        {isLoading ? (
          <div className={cl.center_container}>
            <Loader />
          </div>
        ) : universities.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>№</th>
                <th>Код</th>
                <th>Провінція</th>
                <th>Країна</th>
                <th>Домен</th>
                <th>Назва</th>
                <th>Сторінка</th>
                <th>Зберегти</th>
              </tr>
            </thead>
            <tbody>
              {universities.map((university, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{university.alpha_two_code}</td>
                  <td>
                    {university["state-province"]
                      ? university["state-province"]
                      : "-"}
                  </td>
                  <td>{university.country}</td>
                  <td>
                    {university.domains.map((domain) => (
                      <p key={domain} href={domain}>
                        {domain}
                        <br />
                      </p>
                    ))}
                  </td>
                  <td>{university.name}</td>
                  <td>
                    {university.web_pages.map((page) => (
                      <a key={page} href={page}>
                        {page}
                        <br />
                      </a>
                    ))}
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name={university.name}
                      id={university.name}
                      onChange={() => {
                        saveHandleChange(university.name);
                      }}
                      checked={
                        university.checked
                          ? university.checked
                          : isExistInStorage(university.name)
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={cl.center_container}>
            <p>Немає даних</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
