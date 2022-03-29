import { useState } from "react";
import styles from "./App.module.css";
import powered from "./assets/powered.png";
import arrow from "./assets/leftarrow.png";
import GridItem from "./components/GridItem";

import { levels, calculeteImc, Level } from "./helpers/imc";

const App = () => {
  const [heightFild, setHeightFild] = useState<number>(0);
  const [weightFilde, setWeightFild] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleCalculeteButton = () => {
    if (heightFild && weightFilde) {
      setToShow(calculeteImc(heightFild, weightFilde));
      setDisabled(true);
    } else {
      alert("Digite todos os campos.");
    }
  };

  const handleRightButton = () => {
    setToShow(null);
    setDisabled(false);
    setHeightFild(0);
    setWeightFild(0);
  };

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={powered} alt="" width={150} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC</h1>
          <p>
            IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela
            Organização Mundial de Saúde para calcular o peso ideal de cada
            pessoa.
          </p>
          <input
            type="number"
            placeholder="Digite a sua altura. Ex: 1.5 (em métros)"
            value={heightFild > 0 ? heightFild : ""}
            onChange={(e) => setHeightFild(parseFloat(e.target.value))}
            disabled={disabled}
          />
          <input
            type="number"
            placeholder="Digite o seu peso. Ex: 70.6 (em KG)"
            value={weightFilde > 0 ? weightFilde : ""}
            onChange={(e) => setWeightFild(parseFloat(e.target.value))}
            disabled={disabled}
          />
          <button onClick={handleCalculeteButton} disabled={disabled}>
            Calcular
          </button>
        </div>
        <div className={styles.rightSide}>
          {!toShow && (
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} data={item} />
              ))}
            </div>
          )}
          {toShow && (
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleRightButton}>
                <img src={arrow} alt="" width={25} />
              </div>
              <GridItem data={toShow} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
