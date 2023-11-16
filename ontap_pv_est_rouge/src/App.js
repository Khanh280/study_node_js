import logo from './logo.svg';
import './App.css';
import React from "react";
import Student from "./component/Student";

function App() {
    const student = new Student("Khanh")

    return (
        alert("Hello "+student.getName())
    );
}

export default App;
