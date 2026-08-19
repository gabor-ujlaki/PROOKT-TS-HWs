### Könnyű Házi Feladat: Alapvető OOP Gyakorlat TypeScript-ben

#### Cél
A feladat célja, hogy gyakoroljuk az objektumorientált programozás (OOP) alapjait TypeScript-ben. Egy egyszerű rendsze megalkotásával, amely könyvek kezelésére képes.

#### Követelmények

**1. Könyv Osztály (Book Class)**

- **Tulajdonságok:**
  - `id`: egyedi azonosító, string
  - `title`: könyv címe, string
  - `author`: szerző, string
  - `price`: ár, number
  - <mark>`status`: státusz, string</mark>

- **Metódusok:**
  - Konstruktor a könyv létrehozásához az összes szükséges információval
  - <mark>getterek és setterek: kiíratáshoz és státusz kezeléshez</mark>

**2. Könyvtár Osztály (Library Class)**

- **Tulajdonságok:**
  - `books`: Könyvek listája (`Book[]` típusú)

- **Metódusok:**
  - `addBook(book: Book)`: Könyv hozzáadása a könyvtárhoz
  - `removeBook(id: string)`: Könyv eltávolítása az ID alapján
  - `findBookById(id: string)`: Könyv keresése ID alapján
  - `listAllBooks()`: Összes könyv listázása

**3. Felhasználó Osztály (User Class)**

- **Tulajdonságok:**
  - `userId`: egyedi azonosító, string
  - `name`: név, string
  - `email`: email cím, string

- **Metódusok:**
  - Konstruktor a felhasználó létrehozásához az összes szükséges információval
  - `borrowBook(library: Library, bookId: string)`: Könyv kölcsönzése a könyvtárból

### Speciális Követelmények

- **Interface használata:** 
  - Hozz létre egy `ILibrary` interface-t, amely a könyvtárhoz kapcsolódó alapvető metódusokat határozza meg.

- **Library osztály implementálja az `ILibrary` interface-t.**