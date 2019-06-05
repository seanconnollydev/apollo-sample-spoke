# Apollo Server Hub & Spoke Example Implementation

This project demonstrates how [Apollo Federation](https://blog.apollographql.com/apollo-federation-f260cf525d21) can be used to implement a "Hub & Spoke" pattern with GraphQL services.

## What does Hub & Spoke even mean?
A **Hub** is a centralized GraphQL service that captures common models like Accounts, Users, Organizations, etc.

The hub for this project can be found here: https://github.com/goldenshun/apollo-sample-hub

**Spokes** are decentralized GraphQL services that capture use-case specific models.

## When to use Hub & Spoke
The Hub & Spoke pattern is useful in an organization where some models are common (and therefore should be centralized) where other models are more specific to a specific use case and therefore should be co-located with the application that uses them.

## What are the benefits?

As discussed in this [Spectrum thread](https://spectrum.chat/apollo/apollo-federation/apollo-federation-with-co-located-client-server~dbea1815-2bbc-4581-9fd5-6162cd71eb34), co-locating a GraphQL service with the application that uses it provides the following benefits:

- Frontend developers are responsible for writing the Apollo Server code for new features so we typically write client and server code at the same time
- Tighter feedback loop in development between server and client
- Server/client can be tested in entirety before going to master/production
- GraphQL schema is tailored for its use in the application
- Easier to grok what is in use/available for the specific application rather than the "whole world"

But in an ecosystem with multiple applications, and therefore multiple GraphQL services, there is likely to be duplication for commonly referenced models like Accounts, Users, etc.

The Hub & Spoke pattern addresses this downside by allowing applications to continue to co-locate with their GraphQL services but pull commonly referenced models into a single GraphQL service.