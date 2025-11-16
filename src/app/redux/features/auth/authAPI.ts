import { api } from "../../services/api";

export interface UserProfile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  contact_number: string;
  birthday: string | null;
  profile_image: string | null;
  bio: string;
}

export const authAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (body: {
        first_name: string;
        last_name: string;
        email: string;
        password: string;
      }) => ({
        url: "/api/users/signup/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    login: builder.mutation({
      query: (body: { email: string; password: string }) => ({
        url: "/api/auth/login/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    getUserProfile: builder.query<UserProfile, void>({
      query: () => ({
        url: "/api/users/me/",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    updateProfile: builder.mutation<UserProfile ,FormData>({
      query: (body) => ({
        url: "/api/users/me/", 
        method: "PATCH", //
        body,
      }),
      invalidatesTags: ["Auth"], 
    }),
  }),
  overrideExisting: false,
});

// Export the hooks
export const { useSignupMutation, useLoginMutation, useGetUserProfileQuery,useUpdateProfileMutation } =
  authAPI;
