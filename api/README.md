# API Specification.

## Technical details of the Backend.

We have three collections in the MongoDB database.

### Credentials.

I't saves all the info of the users.

The fields of the collection are:

- **_id:** string. Identifies the document in the collection.
- **name_lastname:** string.
- **dni:** string.
- **organization:** string. It can be 'Defensa Civil', 'Bomberos or 'Policía'.
- **email:** string.
- **password:** string.

### Entities.

I't saves all the info of the differents Entities.

The fields of the collection are:

- **_id:** string. Identifies the document in the collection.
- **name:** string.
- **entityType:** string. It can be 'Educación', 'Centro salud', 'Depósito combustible', 'Organismo público', 'Lugar evento masivo', 'Club' or 'Hogar acogida'.
- **legalNumber:** string.
- **address:** string.
- **phone:** string.
- **postalCode:** string.
- **email:** string.
- **sector:** string. It can be 'Privada', 'Estatal' or 'Público'.
- **risk:** string[].
- **coordinates:** string[].

### Events.

I't saves all the info o the differents Events.

The fields of the collection are:

- **_id:** string. Identifies the document in the collection.
- **title:** string.
- **description:** string.
- **coordinates:** string[].
- **event_type:** string. It can be 'Incendio', 'Inundacion' or 'Accidente de transito'.
- **creator:** object.
- **date_time:** Date.
- **active:** boolean.

***

## Endpoints.

### Credentials Endpoint.

'/credentials/signup' → `post` to create a new credential.

'/credentials/login?:admin' → `post` to login in the admin and in the app systems.

'/credentials' → `get` to get the credentials with pagination.

'/credentials/get/:id' → `get` to get an specific credential.

'/credentials/password' → `post` to generate a new random password for a credential.

'/credentials/:id/password' → `put` to change the password of the credential.

'/credentials/:id' → `put` to edit the info of the credential.

'/credentials/:id' → `delete` to delete an specific credential.

'/credentials/stats' → `get` to get all the stats of the credentials.

### Entities Endpoint.

'/entities/all' → `get` to get all the entities.

'/entities' → `get` to get entities with pagination.

'/entities/stats' → `get` to get all the stats of the entities.

'/entities/:id' → `get` to get an specific entity.

'/entities' → `post` to create a new entity.

'/entities/:id' → `put` to edit an specific entity.

'/entities/:id' → `delete` to delete an specific entity.

### Events Endpoint.

'/events' → `get` to get all the active events.

'/events/stats' → `get` to get all the stats of the events.

'/events/active' → `get` to get active events with pagination.

'/events/inactive' → `get` to get inactive events with pagination.

'/events/:id' → `put` to set an event as inactive.

'/events/:id' → `delete` to delete an specific event.