import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [answerValue, setAnswerValue] = useState(0);
  const [memoryValue, setMemoryValue] = useState(0);
  const [operatorValue, setOperatorValue] = useState(0);
  const [readyToReplace, setReadyToReplace] = useState(true);
  const [clearButtonText, setClearButtonText] = useState("AC");
  const [buttonActive, setButtonActive] = useState(0);
  const [equationText, setEquationText] = useState("");
  const [displayEquationText, setDisplayEquationText] = useState(false);
  const [readyToClearEquation, setReadyToClearEquation] = useState(false);
  const [lastPressed, setLastPressed] = useState("");

  const buttonPressed = (value) => {
    if (readyToClearEquation && value != "=") {
      setEquationText("");
      setDisplayEquationText(false);
      setReadyToClearEquation(false);
    }

    if (isNaN(value)) {
      if (value == "AC") {
        setAnswerValue(0);
        setMemoryValue(0);
        setOperatorValue(0);
        setReadyToReplace(true);
        setButtonActive(0);
      } else if (value == "C") {
        setAnswerValue(0);
        setReadyToReplace(true);
        setClearButtonText("AC");
      } else if (value == "+/-") {
        setAnswerValue(answerValue * -1);
      } else if (value == "%") {
        setAnswerValue(answerValue * 0.01);
      } else if (value == "+" || value == "-" || value == "x" || value == "÷") {
        if (operatorValue == 0 || isNaN(lastPressed)) {
          setMemoryValue(answerValue);
        } else {
          setMemoryValue(calculateEquals());
        }

        setOperatorValue(value);
        setReadyToReplace(true);
        setButtonActive(value);
      } else if (value == "=") {
        if (operatorValue != 0) {
          setAnswerValue(calculateEquals());
          setMemoryValue(0);
          setOperatorValue(0);
          setReadyToReplace(true);
          setButtonActive(0);
          setDisplayEquationText(true);
          setReadyToClearEquation(true);
        }
      }
    } else {
      setAnswerValue(handleNumber(value));
      setClearButtonText("C");
    }

    setLastPressed(value);
  };

  const handleNumber = (number) => {
    if (readyToReplace) {
      if (number != 0) {
        setReadyToReplace(false);
      }

      return number;
    } else {
      return answerValue + number;
    }
  };

  const calculateEquals = () => {
    if (equationText == "") {
      setEquationText(memoryValue + " " + operatorValue + " " + answerValue);
    } else {
      setEquationText(equationText + " " + operatorValue + " " + answerValue);
    }

    const previous = parseFloat(memoryValue);
    const current = parseFloat(answerValue);

    switch (operatorValue) {
      case "+":
        return previous + current;

      case "-":
        return previous - current;

      case "x":
        return previous * current;

      case "÷":
        return previous / current;
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.displayContainer}>
          <Text style={styles.equationText}>
            {displayEquationText ? equationText + " =" : ""}
          </Text>
          <Text style={styles.displayText}>{answerValue}</Text>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.buttonRow1, styles.ac]}
            onPress={() => buttonPressed(clearButtonText)}
          >
            {clearButtonText == "AC" ? (
              <>
                <Image
                  source={require("./assets/letter-a.png")}
                  style={[styles.size1, styles.a]}
                />
                <Image
                  source={require("./assets/letter-c.png")}
                  style={styles.size1}
                />
              </>
            ) : (
              <Image
                source={require("./assets/letter-c.png")}
                style={styles.size1}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonRow1}
            onPress={() => buttonPressed("+/-")}
          >
            <Image
              source={require("./assets/plus-minus.png")}
              style={styles.size2}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonRow1}
            onPress={() => buttonPressed("%")}
          >
            <Image
              source={require("./assets/percent.png")}
              style={styles.size2}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.buttonRow1,
              buttonActive == "÷" ? styles.buttonOrange : styles.buttonBlue,
            ]}
            onPress={() => buttonPressed("÷")}
          >
            <Image
              source={require("./assets/divide.png")}
              style={styles.size1}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => buttonPressed("7")}
          >
            <Image source={require("./assets/7.png")} style={styles.size3} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => buttonPressed("8")}
          >
            <Image source={require("./assets/8.png")} style={styles.size3} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => buttonPressed("9")}
          >
            <Image source={require("./assets/9.png")} style={styles.size3} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              buttonActive == "x" ? styles.buttonOrange : styles.buttonBlue,
            ]}
            onPress={() => buttonPressed("x")}
          >
            <Image
              source={require("./assets/multiply.png")}
              style={styles.size1}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => buttonPressed("4")}
          >
            <Image source={require("./assets/4.png")} style={styles.size3} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => buttonPressed("5")}
          >
            <Image source={require("./assets/5.png")} style={styles.size3} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => buttonPressed("6")}
          >
            <Image source={require("./assets/6.png")} style={styles.size3} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              buttonActive == "-" ? styles.buttonOrange : styles.buttonBlue,
            ]}
            onPress={() => buttonPressed("-")}
          >
            <Image
              source={require("./assets/minus.png")}
              style={styles.size1}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => buttonPressed("1")}
          >
            <Image source={require("./assets/1.png")} style={styles.size3} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => buttonPressed("2")}
          >
            <Image source={require("./assets/2.png")} style={styles.size3} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => buttonPressed("3")}
          >
            <Image source={require("./assets/3.png")} style={styles.size3} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              buttonActive == "+" ? styles.buttonOrange : styles.buttonBlue,
            ]}
            onPress={() => buttonPressed("+")}
          >
            <Image source={require("./assets/plus.png")} style={styles.size1} />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.button, styles.buttonZero]}
            onPress={() => buttonPressed("0")}
          >
            <Image
              source={require("./assets/0.png")}
              style={[styles.size3, styles.zero]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => buttonPressed(".")}
          >
            <Image source={require("./assets/dot.png")} style={styles.size4} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonBlue]}
            onPress={() => buttonPressed("=")}
          >
            <Image
              source={require("./assets/equal.png")}
              style={styles.size1}
            />
          </TouchableOpacity>
        </View>

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: "#F2F0E4",
    paddingHorizontal: 8,
    paddingBottom: 8,
  },

  displayContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 16,
  },

  equationText: {
    fontSize: 20,
    paddingRight: 10,
  },

  displayText: {
    fontSize: 64,
    paddingRight: 10,
  },

  row: {
    flexDirection: "row",
    marginBottom: 8,
  },

  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6B9AC4",
    marginHorizontal: 4,
    height: 80,
    borderRadius: 160,
  },

  buttonRow1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97D8C4",
    marginHorizontal: 4,
    height: 80,
    borderRadius: 160,
  },

  buttonBlue: {
    backgroundColor: "#4059AD",
  },

  buttonOrange: {
    backgroundColor: "#F4B942",
  },

  buttonZero: {
    flex: 2,
    justifyContent: "center",
    alignItems: "left",
    paddingLeft: 10,
  },

  zero: {
    marginLeft: 12,
  },

  size1: {
    width: 30,
    height: 30,
  },

  size2: {
    width: 35,
    height: 35,
  },

  size3: {
    width: 40,
    height: 40,
  },

  size4: {
    width: 55,
    height: 55,
  },

  ac: {
    flexDirection: "row",
  },

  a: {
    marginRight: -5,
  },
});
