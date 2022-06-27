import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://62b1d228c7e53744afc2005c.mockapi.io/contacts' }),
  tagTypes: ['Contact'],
  endpoints: (builder) => ({
    getAllContacts: builder.query({
      query: () => '',
      providesTags: ['Contact']
    }),
    getContactById: builder.query ({
      query: (id) => `/${id}`,
      providesTags: ['Contact']
    }),
    postContact: builder.mutation ({
      query: (object) => ({
        method: 'POST',
        body: object,
      }),
      invalidatesTags: ['Contact'],
    }),
    editContactById: builder.mutation ({
      query: ({ id, ...rest }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: rest,
      }),
      invalidatesTags: ['Contact'],
    }),
    deleteContactById: builder.mutation ({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
})

export const {
  useGetAllContactsQuery,
  useGetContactByIdQuery,
  usePostContactMutation,
  useEditContactByIdMutation,
  useDeleteContactByIdMutation
} = contactsApi;
export default contactsApi;
