// This file is auto-generated by @hey-api/openapi-ts

export type TodoListResponse = Array<{
  id: number;
  text: string;
  completed: boolean;
}>;

export type TodoAddData = {
  requestBody: {
    text: string;
  };
};

export type TodoAddResponse = {
  id: number;
  text: string;
  completed: boolean;
};

export type TodoCompleteData = {
  id: number;
};

export type TodoCompleteResponse = {
  id: number;
  text: string;
  completed: boolean;
};

export type $OpenApiTs = {
  "/todo/getAll": {
    get: {
      res: {
        /**
         * Successful response
         */
        200: Array<{
          id: number;
          text: string;
          completed: boolean;
        }>;
      };
    };
  };
  "/todo/add": {
    post: {
      req: TodoAddData;
      res: {
        /**
         * Successful response
         */
        200: {
          id: number;
          text: string;
          completed: boolean;
        };
      };
    };
  };
  "/todo/{id}": {
    put: {
      req: TodoCompleteData;
      res: {
        /**
         * Successful response
         */
        200: {
          id: number;
          text: string;
          completed: boolean;
        };
      };
    };
  };
};
