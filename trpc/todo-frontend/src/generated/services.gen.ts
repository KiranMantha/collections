// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from "./core/CancelablePromise";
import { OpenAPI } from "./core/OpenAPI";
import { request as __request } from "./core/request";
import type {
  TodoListResponse,
  TodoAddData,
  TodoAddResponse,
  TodoCompleteData,
  TodoCompleteResponse,
} from "./types.gen";

export class TodoService {
  /**
   * @returns unknown Successful response
   * @throws ApiError
   */
  public static todoList(): CancelablePromise<TodoListResponse> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/todo.list",
    });
  }

  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns unknown Successful response
   * @throws ApiError
   */
  public static todoAdd(data: TodoAddData): CancelablePromise<TodoAddResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/todo.add",
      body: data.requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * @param data The data for the request.
   * @param data.requestBody
   * @returns unknown Successful response
   * @throws ApiError
   */
  public static todoComplete(
    data: TodoCompleteData,
  ): CancelablePromise<TodoCompleteResponse> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/todo.complete",
      body: data.requestBody,
      mediaType: "application/json",
    });
  }
}
