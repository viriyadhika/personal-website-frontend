"use client";

import { Box, Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export type QuestionAnswer = { question: string; answer: string };

function randomize(length: number) {
  return Math.floor(Math.random() * length);
}

function pickRandomQuestion(questions: Array<QuestionAnswer>) {
  const randIdx = randomize(questions.length);

  return questions[randIdx];
}

function generateOptions(answer: string, questions: Array<QuestionAnswer>) {
  const result = [answer];
  for (let i = 0; i < 3; i++) {
    const randIdx = randomize(questions.length);
    result.push(questions[randIdx].answer);
  }

  return result;
}

enum State {
  ANSWERING = "ANSWERING",
  SHOW_RESULT = "SHOW_RESULT",
}

function Answering({
  currentQuestion,
  options,
  onAnswer,
}: {
  currentQuestion: QuestionAnswer;
  options: string[];
  onAnswer: (ans: string) => void;
}) {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={2}>
      <Typography variant="h5">{currentQuestion.question}</Typography>
      {options.map((opt, idx) => {
        return (
          <Box key={`${opt}-${idx}`}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                onAnswer(opt);
              }}
            >
              {opt}
            </Button>
          </Box>
        );
      })}
    </Box>
  );
}

function Result({
  currentQuestion,
  answer,
  onNext,
}: {
  currentQuestion: QuestionAnswer;
  answer: string;
  onNext: () => void;
}) {
  return (
    <Box display={"flex"} flexDirection={"column"} gap={2}>
      {currentQuestion.answer === answer ? (
        <Typography variant={"body1"} color={"success"}>
          Correct!
        </Typography>
      ) : (
        <Box>
          <Typography variant={"body1"} color={"error"}>
            Wrong!
          </Typography>
          <Typography variant={"body1"} color={"info"}>
            {currentQuestion.question}
          </Typography>
          <Typography variant={"body1"} color={"info"}>
            {currentQuestion.answer}
          </Typography>
        </Box>
      )}
      <Button variant="outlined" onClick={onNext}>
        Next
      </Button>
    </Box>
  );
}

function FlashcardPage({
  initialUnusedQuestion,
}: {
  initialUnusedQuestion: Array<QuestionAnswer>;
}) {
  const initialQuestion = pickRandomQuestion(initialUnusedQuestion);
  const initialOptions = generateOptions(
    initialQuestion.answer,
    initialUnusedQuestion
  );
  const [state, setState] = useState<State>(State.ANSWERING);
  const [unusedQuestion, setUnusedQuestion] = useState(initialUnusedQuestion);
  const [currentQuestion, setCurrentQuestion] = useState(initialQuestion);
  const [options, setOptions] = useState(initialOptions);
  const [answer, setAnswer] = useState("");

  const mapping: Record<State, State> = {
    [State.ANSWERING]: State.SHOW_RESULT,
    [State.SHOW_RESULT]: State.ANSWERING,
  };

  function onAnswer(answer: string) {
    setState((cur) => mapping[cur]);
    if (answer === currentQuestion.answer) {
      setUnusedQuestion((cur) =>
        cur.filter((qn) => qn.question !== currentQuestion.question)
      );
    }
    setAnswer(answer);
  }

  function onNext() {
    setState((cur) => mapping[cur]);
    const newCurrentQuestion = pickRandomQuestion(unusedQuestion);
    setCurrentQuestion(newCurrentQuestion);
    setOptions(generateOptions(newCurrentQuestion.answer, unusedQuestion));
  }

  return (
    <>
      {state === State.ANSWERING && (
        <Answering
          currentQuestion={currentQuestion}
          options={options}
          onAnswer={onAnswer}
        />
      )}
      {state === State.SHOW_RESULT && (
        <Result
          currentQuestion={currentQuestion}
          answer={answer}
          onNext={onNext}
        />
      )}
    </>
  );
}

export default function Content({
  initialUnusedQuestion,
}: {
  initialUnusedQuestion: Array<QuestionAnswer>;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
      width={"100%"}
    >
      <Card style={{ padding: 24 }}>
        {isClient && (
          <FlashcardPage initialUnusedQuestion={initialUnusedQuestion} />
        )}
      </Card>
    </Box>
  );
}
