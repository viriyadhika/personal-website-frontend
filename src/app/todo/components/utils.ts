import { TodoResponse } from "../types";


export function getReorderedTodoResponse(todoResponse: Array<TodoResponse>, idx: number, isGoingUp: boolean): Array<TodoResponse> {
    const cpTodoResponse = structuredClone(todoResponse)
    if (isGoingUp) {
        const temp = cpTodoResponse[idx]
        cpTodoResponse[idx] = cpTodoResponse[idx - 1]
        cpTodoResponse[idx - 1] = temp
    } else {
        const temp = cpTodoResponse[idx]
        cpTodoResponse[idx] = cpTodoResponse[idx + 1]
        cpTodoResponse[idx + 1] = temp
    }

    return cpTodoResponse
}