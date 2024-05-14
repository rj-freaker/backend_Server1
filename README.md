```markdown
# Person and Anime Character Database API

This API is designed to manage information about both persons and anime characters. It utilizes Express and Node.js and allows for CRUD operations on both persons and characters.

## Endpoints

### Person

- **Add a Person**
  - Endpoint: POST /person
  - Description: Adds a new person to the database.

- **Get All Persons**
  - Endpoint: GET /person
  - Description: Retrieves a list of all persons in the system.

- **Get Persons by Work Type**
  - Endpoint: GET /person/:workType
  - Description: Retrieves a list of persons based on their work type (e.g., chef, waiter, manager).

- **Update a Person**
  - Endpoint: PUT /person/:id
  - Description: Updates the details of a specific person identified by their ID.

- **Delete a Person**
  - Endpoint: DELETE /person/:id
  - Description: Deletes a person from the system based on their ID.

### Character

- **Add a Character**
  - Endpoint: POST /character
  - Description: Adds a new character to the database.

- **Get All Characters**
  - Endpoint: GET /character
  - Description: Retrieves a list of all characters in the system.

- **Update a Character**
  - Endpoint: PUT /character/:id
  - Description: Updates the details of a specific character identified by their ID.

- **Delete a Character**
  - Endpoint: DELETE /character/:id
  - Description: Deletes a character from the system based on their ID.

## Data Models

### Person

The Person data model represents information about persons.

#### Fields:

- name: String (Person's name)
- age: Number (Person's age)
- work: Enum (Developer, Debugger, Analyst, Manager, Programmer)
- mobile: String (Person's mobile number, unique, required)
- email: String (Person's email address, unique, required)

#### Example:
```json
{
  "name": "Jerry Cyrus",
  "age": 23,
  "work": "Debugger",
  "mobile": "123-456-7890",
  "email": "jerry@example.com"
}
```

### Character

The Character data model represents characters of anime.

#### Fields:

- name: String (Character's name)
- anime: String (Anime name, required)
- gender: String (Character gender, maxLength = 1, required)
- mainProtagonist: Boolean (Character is main protagonist or not, required)

#### Example:
```json
{
  "name": "Monkey D Luffy",
  "anime": "One Piece",
  "gender": "M",
  "mainProtagonist": true
}
```

## Usage

To install dependencies, run:

```bash
npm install
```
