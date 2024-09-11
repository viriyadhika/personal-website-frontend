import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { QuestionAnswer } from "./types";

function randomize(length: number) {
  return Math.floor(Math.random() * length);
}

function pickRandomQuestion(questions: Array<QuestionAnswer>) {
  const randIdx = randomize(questions.length);

  return questions[randIdx];
}

function generateOptions(answer: string, questions: Array<QuestionAnswer>) {
  const result = [];
  const ansLength = 4;
  const decoyAnswerLength = ansLength - 1;
  for (let i = 0; i < decoyAnswerLength; i++) {
    const randIdx = randomize(questions.length);
    result.push(questions[randIdx].answer);
  }
  const answerIdx = ansLength - 1;
  // Placeholder
  result.push(answer);

  const idxToSwap = Math.floor(Math.random() * ansLength);
  result[answerIdx] = result[idxToSwap];
  result[idxToSwap] = answer;

  result.push("I don't know");

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

export default function FlashcardContent({
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
    setOptions(
      generateOptions(newCurrentQuestion.answer, initialUnusedQuestion)
    );
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
