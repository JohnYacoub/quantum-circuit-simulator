
![contributors](https://img.shields.io/github/contributors/XandraV/quantum-react-frontend?color=gold)
![commit](https://img.shields.io/github/last-commit/XandraV/quantum-react-frontend?color=cyan)

# Quantum Circuit Simulator

![javascript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![react](https://img.shields.io/badge/-React-45b8d8?style=flat-square&logo=react&logoColor=white)
![styled](https://img.shields.io/badge/-Styled_Components-db7092?style=flat-square&logo=styled-components&logoColor=white)
![material-ui](https://img.shields.io/badge/-MaterialUI-0081CB?style=flat-square&logo=material-ui&logoColor=white)
![python](https://img.shields.io/badge/-Python-3776AB?style=flat-square&logo=python&logoColor=white)

A web application that allows the user to graphically build quantum circuits and view the results on a dashboard. This project combines **React(JavaScript)** frontend with a **Flask(Python)** backend that is the host program to call **Q#** functions to perform quantum operations.

This repository contains the front end source code with additional backend logic written in JavaScript and is automated with continuous deployment on [AWS Amplify](https://aws.amazon.com/amplify/).

You can visit the deployed, fully functional app [here](https://master.d2fi7ys7p5ku9u.amplifyapp.com/).

![app](https://quantumcircuitsimulator.s3.eu-west-2.amazonaws.com/quantumapp.gif)

Backend source code can be found [here](https://github.com/XandraV/quantum-python-backend/).

## Installation

Clone the master branch and then run the following scripts in the project directory:

- `npm install` - to install relevant dependencies

- `npm start` - start the react app


## Resources

| Description                                                        | Link                                                                      |
| :----------------------------------------------------------------- | :------------------------------------------------------------------------ |
| Material-UI components - a popular React UI framework              | [Material-UI docs](https://material-ui.com/getting-started/installation/) |
| Library that utilises tagged template literals to style components | [styled components](https://styled-components.com/)                       |
| React - JavaScript library for building user interfaces            | [create-react-app](https://github.com/facebook/create-react-app)|
|AWS Amplify |  [Amplify](https://aws.amazon.com/amplify/)

## Created with create-react-app

This app was created with [create-react-app](https://github.com/facebook/create-react-app), see usage guidelines in [create-react-app-readme.md](create-react-app-readme.md)