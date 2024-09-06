import axios from "axios";
import Content, { QuestionAnswer } from "./content";
import { NEXT_PUBLIC_API_URL } from "@/env/env";

export default async function FlashcardPage() {
  try {
    const data = await axios.post<Array<QuestionAnswer>>(
      `${NEXT_PUBLIC_API_URL}/flashcard/get_data`
    );
    return <Content initialUnusedQuestion={data.data} />;
  } catch (exception: any) {
    return (
      <div>{exception?.response?.data?.message ?? "Something went wrong"}</div>
    );
  }
}
