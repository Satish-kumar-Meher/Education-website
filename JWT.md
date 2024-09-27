What is JWT ?

> JWTs are often used for authentication and authorization in web applications

> Authentication -: Verifying the identy of a user or client 

> Authorization -: Detremining what actions a user or client is allowed to perform


>> Compinents of JWT -:

> Headers :  Contains metadata about the token , such as the type of token and the signingn algorithm being used . 

> Payload : Contains claims or statesments about an entity (typically the user ) and additional data  . Common claims include user ID, username and expiration time of the token.

> Signature : To verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way, a signature is included .


JWT are typically nnot stored in database along with other user details. Instead they are issued by the server during the authentication process and then stored on the client-side (in cookies or local storage) for later use. 



