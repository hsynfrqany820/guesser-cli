#!/usr/bin/env node
import { input, select } from "@inquirer/prompts";
import { Command } from "commander";
import chalk from "chalk";

const program = new Command();

// asking user name
async function askingName() {
  const name = await input({
    message: "What is your name?",
    required: true,
  });

  return chalk.green(name);
}

async function chooseLevel() {
  const level = await select({
    message: "Enter your level!",
    choices: [
      {
        name: "easy (10 attempts)",
        value: 10,
      },
      {
        name: "medium (5 attempts)",
        value: 5,
      },
      {
        name: "hard (3 attempts)",
        value: 3,
      },
    ],
  });

  return level;
}

async function main() {
  // const targetNumber: number = Math.floor(1 + Math.random() * 100);
  const targetNumber: number = 2;
  const username = await askingName();
  console.log(`Hello ${username}! Let's play a game`);
  console.log(
    `You should guess a number between ${chalk.yellow(
      "1 and 100"
    )}. How many attempts do you have? based on your difficulty level!\n`
  );

  let attempts = await chooseLevel();
  switch (attempts) {
    case 10:
      console.log(`you've chosen the ${chalk.green("easy")} level!`);
      break;
    case 5:
      console.log(`you've chosen the ${chalk.yellow("medium")} level!`);
      break;
    case 3:
      console.log(`you've chosen the ${chalk.red("hard")} level!`);
      break;
  }

  console.log("\nnow, let's start! guess the number!");
  while (attempts != 0) {
    const userAnswer = await input({
      message: "What's your guess?",
      required: true,
    });

    if (+userAnswer > targetNumber && attempts != 1) {
      console.log(`Incorrect! the number is less then ${userAnswer}`);
    }

    if (+userAnswer < targetNumber && attempts != 1) {
      console.log(`Incorrect! the number is greater then ${userAnswer}`);
    }

    if (+userAnswer == targetNumber) {
      console.log("congratulation!");
      process.exit(0);
    }

    attempts--;
  }
  console.log(chalk.red(`fuck you! the number was ${targetNumber} stupid!`));
  process.exit(1);
}

program.action(main);

program.parse();
