// src/features/todos/todoAPI.ts
import { api } from "../../services/api";

export const todosAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (search: string) => `api/todos/`,
      providesTags: ["Todo"],
    }),

    createTodo: builder.mutation({
      query: (body: { title: string; description?: string }) => ({
        url: "/api/todos/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Todo"],
    }),

    deleteTodo: builder.mutation({
      query: (id: string) => ({
        url: `api/todos/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),

    updateTodo: builder.mutation({
      query: ({
        id,
        data,
      }: {
        id: string | number;
        data: {
          title: string;
          description: string;
     
        };
      }) => ({
        url: `/api/todos/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = todosAPI;
