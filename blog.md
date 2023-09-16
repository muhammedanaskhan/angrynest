# Libraries

- clerk - implmement authentication
- uploadthing - upload profile images
- mongoose -
- svix - for webhooks
- react-hook-form - Manage form validation easily
- zod - Declaring and validating Schemas, for complete guide - [https://ui.shadcn.com/docs/components/form]
- currentUser() from clerk - helper returns the User object of the currently active user, which is default put in onboarding form
- uploadthing - handles file upload + server side authentication 

# Layout

- Defined metadata objects in Layout Component which contains default metadata tags of the application, These metadata tags are important for search engine optimization (SEO).
- 


# Account onboarding

- { useForm } from "react-hook-form": Managing forms, rovides hooks and utilities for handling form state and validation.
- zod is providing methods to write validation logic(schema) in a function - userValidation, which is passed to zodResolver in useForm hook
- onSubmit() - Re-uploads the new data(updates), in the Mongo DB 
  -  check if image is changed - use isBase64Image from utils.ts
  -  if changed - upload using package uploadthing from lib folder
  -  handle file upload using useUploadThing from uploadthing library

# File Structure

- Route Groups - Grouping related routes together in folder - (folder), without affecting the URL
- app folder - contains both UI route and API route
- API routes - Custom routes to handle HTTP requests/responses
 - written in JavaScript are automatically deployed as serverless functions in the cloud. API routes provide a backend-like functionality within the frontend Next.js app,so we can build web applications without the need for a separate server.
 - We're eliminating backend API routes (NodeJs Server), because we're already rendering everything on the server-side, we have server-side rendered page having client-side components 
- utils - contains utility functions, that we re-use across the code 

# Backend

- 