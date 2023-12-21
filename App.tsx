import React, { useState, useEffect, Component } from "react";
import {
    View,
    StyleSheet,
    useColorScheme,
    SafeAreaView,
    LogBox,
} from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

// Components
import Button from "./src/components/Button";
import Display from "./src/components/Display";

const initialState = {
    displayValue: "0",
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0,
};
export default class App extends Component {
    state = { ...initialState };

    addDigit = (n: string) => {
        if (n === "." && this.state.displayValue.includes(".")) {
            return;
        }

        let clearDisplay;

        if (this.state.displayValue === "0" || this.state.clearDisplay) {
            if (n !== ".") {
                clearDisplay = true;
            } else {
                clearDisplay = false;
            }
        }

        const currentValue = clearDisplay ? "" : this.state.displayValue;
        const displayValue = currentValue + n;
        this.setState({ displayValue, clearDisplay: false });

        if (n !== ".") {
            ("");
            const newValue = parseFloat(displayValue);
            const values = [...this.state.values];
            values[this.state.current] = newValue;
            this.setState({ values });
        }
    };

    clearMemory = () => {
        this.setState({ ...initialState });
    };

    setOperation = (operation: string) => {
        if (this.state.current === 0) {
            this.setState({
                operation,
                current: 1,
                clearDisplay: true,
            });
        } else {
            const equals = operation === "=";
            const values = [...this.state.values];
            try {
                values[0] = eval(
                    `${values[0]} ${this.state.operation} ${values[1]}`
                );
            } catch (error) {
                values[0] = this.state.values[0];
            }

            values[1] = 0;
            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: true,
                values
            });
        }
    };

    render(): React.ReactNode {
        return (
            <SafeAreaView style={styles.container}>
                <Display value={this.state.displayValue}></Display>
                <View style={styles.buttons}>
                    <Button
                        text="AC"
                        triple
                        onClick={() => this.clearMemory()}
                    ></Button>
                    <Button
                        text="/"
                        operation
                        onClick={this.setOperation}
                    ></Button>
                    <Button text="7" onClick={this.addDigit}></Button>
                    <Button text="8" onClick={this.addDigit}></Button>
                    <Button text="9" onClick={this.addDigit}></Button>
                    <Button
                        text="*"
                        operation
                        onClick={this.setOperation}
                    ></Button>
                    <Button text="4" onClick={this.addDigit}></Button>
                    <Button text="5" onClick={this.addDigit}></Button>
                    <Button text="6" onClick={this.addDigit}></Button>
                    <Button
                        text="-"
                        operation
                        onClick={this.setOperation}
                    ></Button>
                    <Button text="1" onClick={this.addDigit}></Button>
                    <Button text="2" onClick={this.addDigit}></Button>
                    <Button text="3" onClick={this.addDigit}></Button>
                    <Button
                        text="+"
                        operation
                        onClick={this.setOperation}
                    ></Button>
                    <Button text="0" double onClick={this.addDigit}></Button>
                    <Button text="." onClick={this.addDigit}></Button>
                    <Button
                        text="="
                        operation
                        onClick={this.setOperation}
                    ></Button>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttons: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
});
