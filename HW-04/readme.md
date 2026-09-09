### Projekt Feladat: Könyvtári Könyvkezelő Rendszer

**Cél:** Egy OOP alapú könyvtári könyvkezelő rendszer készítése TypeScriptben, amely lehetővé teszi könyvek kezelését (létrehozás, szerkesztés, törlés) kölcsönzését, és visszavételét. A rendszer támogassa a könyvek különböző kategóriákba való szervezését, valamint nyújtson lehetőséget a könyvek és kölcsönzők adatainak lekérdezésére.

**Szükséges TypeScript Elemek:**
- **Generikusok**: Implementálj generikus osztályokat a különböző típusú entitások (pl. könyvek, kölcsönzők) kezelésére.
- **Interface-ek**: Használj interface-eket a könyvek és kölcsönzők definíciójához.
- **Öröklés**: Alkalmazz öröklést a könyvkategóriák különböző típusainak modellezésére.
- **Többalakúság**: Használj többalakúságot a különböző típusú könyvek (pl. szépirodalmi, tudományos) egységes kezelésére.
- **Modulok**: Szervezd a rendszert modulokba a kód strukturálására és a felelősségek elkülönítésére.
- **Union és Intersection típusok**: Alkalmazz union és intersection típusokat a rugalmasabb adattípusok kezelésére.
- **Generikus Típusok**: Használj generikus típusokat a kölcsönzési folyamatok típusbiztos kezelésére.

 ### Projekt létrehozása
A projektet npm  kell létrehozni és kezelni! A verziókezeléshez git-et kell használni github-al! 

-npm használata
-konfigurációs fájlok megírása 
A projekt belépő fájlját npm segítségével lehessen futtatni - ha éppsikerül de a konfigurácó legyen ott ! 

### Plusz feladatok 
- Dekorátor használata - csak kód, config  nem kell 
- Teszt file-ok írása (lefuttatni konfigurálni nem kell) 
- async alkalmazása  
   
   
### Segítség a Könyvtári Könyvkezelő Rendszer Projekt Feladathoz

A célod egy könyvtári könyvkezelő rendszer készítése TypeScriptben, amely ötvözi az objektumorientált programozás (OOP) elveit az advanced TypeScript funkciókkal. Ez a segítség átvezet a projekt kulcselemein és azok implementálásán.

#### Projekt Felépítése

1. **Alapvető Entitások (Models)**
   - Hozz létre `Book` és `Borrower` interface-eket a `models` mappában. Ezek az interface-ek alapvető tulajdonságokat definiálnak, mint az `id`, `title` (könyvek esetében), és `name` (kölcsönzők esetében).

2. **Könyvkategóriák (Inheritance)**
   - Implementálj egy `Category` alaposztályt, és származzatásd belőle a különböző könyvkategóriákat (pl. `Fiction`, `NonFiction`). Minden kategória osztálynak legyenek saját, specifikus attribútumai.

3. **Könyvtár Kezelés (Services)**
   - A `Library` osztály felelős a könyvek, kölcsönzések kezeléséért. Itt tárolódik a könyvek és a kölcsönzők kollekciója, valamint itt implementálhatók a kölcsönzési és visszavételi műveletek.

4. **Generikus Kölcsönzési Logika (Generics)**
   - A `LoanManager<T>` generikus osztály segítségével kezelhetők a kölcsönzések, ahol `T` a kölcsönzött elem típusa. Ez lehetővé teszi, hogy a rendszer rugalmasan kezelje a különböző típusú könyveket.

5. **Többalakúság (Polymorphism)**
   - Használj többalakúságot a `Book` osztályból származtatott különböző könyvtípusok kezelésére. Egy közös interfész vagy alaposztály segítségével egységesítheted a könyvek kezelését.

6. **Union és Intersection Típusok**
   - Alkalmazz union és intersection típusokat a rendszerben előforduló különféle típusú adatok kezelésére, pl. a keresési eredményeknél, ahol több típusú objektum is visszatérhet.

#### Implementációs Útmutató

1. **Interface-ek és Öröklés**

```typescript
// models/book.ts
export interface Book {
  id: number;
  title: string;
  author: string;
}

// models/category.ts
export class Category {
  constructor(public name: string) {}
}

export class Fiction extends Category {
  public genre: string;
  constructor(name: string, genre: string) {
    super(name);
    this.genre = genre;
  }
}
```

2. **Generikusok és Services**

```typescript
// services/library.ts
import { Book } from "../models/book";

export class Library {
  private books: Map<number, Book> = new Map();

  addBook(book: Book): void {
    this.books.set(book.id, book);
  }

  // További metódusok: removeBook, listBooks stb.
}
```

3. **Modulok Használata**

Szervezd a projektet logikai egységek szerint: `models` a modell osztályokhoz és interface-ekhez, `services` az alkalmazáslogikához és `utils` a segédfüggvényekhez.



A könyvtári könyvkezelő rendszer projektjéhez ajánlott fájlstruktúra a következőképpen nézhet ki, biztosítva a kód rendezettségét és moduláris felépítését:

```
library-management-system/
│
├── src/
│   ├── models/                  # Adatmodellek és entitások
│   │   ├── book.ts              # Könyv interface és alaposztály
│   │   ├── borrower.ts          # Kölcsönző interface
│   │   └── category.ts          # Kategória osztályok (pl. Fiction, NonFiction)
│   │
│   ├── services/                # Üzleti logika és szolgáltatások
│   │   ├── library.ts           # Könyvtár kezelő osztály
│   │   └── loanManager.ts       # Kölcsönzési logika generikus osztály
│   │
│   ├── utils/                   # Segédeszközök és hasznos funkciók
│   │   └── typeGuards.ts        # Típusőrök a dinamikus típusellenőrzéshez
│   │
│   └── index.ts                 # Az alkalmazás belépési pontja
│
├── package.json                 # Projekt függőségek és scriptek
├── tsconfig.json                # TypeScript konfigurációs fájl
└── README.md                    # Projekt dokumentáció és használati útmutató
```

### Fájlok és Mappák Szerepe:

- **src/**: Az alkalmazás forráskódjának gyökérmappája.
- **models/**: Definiálja az alkalmazásban használt adatmodelleket és entitásokat, mint például a `Book`, `Borrower`, és különböző `Category` típusok.
- **services/**: Tartalmazza az üzleti logikát és az alkalmazás szolgáltatásait, beleértve a könyvek kezelését és a kölcsönzési folyamatokat.
- **utils/**: Különféle segédeszközök és hasznos funkciók, mint például a típusőrök, amelyek segítenek a típusbiztonság növelésében és a kód újrafelhasználhatóságában.
- **index.ts**: Ez a fájl szolgál az alkalmazás belépési pontjaként, összekötve a modulokat és inicializálva az alkalmazás működését.
- **package.json**: Tartalmazza a projekt metaadatokat, a függőségek listáját, és a scripteket, amelyekkel elindítható a projekt vagy futtathatók tesztek.
- **tsconfig.json**: A TypeScript fordító számára szükséges beállításokat tartalmazza, definiálva például a célverziót, a modulrendszer típusát, és egyéb compiler opciókat.
- **README.md**: A projekt dokumentációját tartalmazza, beleértve az alkalmazás célját, a telepítési és használati utasításokat, valamint bármilyen további információt, ami segíthet a fejlesztőknek és a felhasználóknak.



#### Feladat Leírása:

1. **Könyv és Kölcsönző Interface-ek**: Hozz létre `Book` és `Borrower` interface-eket az alkalmazás alapentitásainak leírásához. Mindkét interface rendelkezzen azonosítóval (`id`) és névvel (`name`).

2. **Könyvkategóriák Öröklése**: Implementálj egy `Category` osztályt, amelyből több specifikus kategória (pl. `Fiction`, `Science`) származik. Minden kategóriának legyenek saját attribútumai, pl. a `Fiction` rendelkezzen `genre` attribútummal.

3. **Könyvtár Osztály**: Hozz létre egy `Library` osztályt, amely kezeli a könyvek listáját, kölcsönzési és visszavételi műveleteket. A `Library` osztály használjon `Map`-et a könyvek és kölcsönzők tárolására.

4. **Generikus Kölcsönzési Logika**: Implementálj egy generikus `LoanManager<T>` osztályt, amely kezeli a kölcsönzések logikáját, ahol `T` lehet `Book` vagy bármilyen `Book`-ból származtatott típus.

5. **Adatlekérdezések**: Készíts metódusokat a `Library` osztályban a könyvek és kölcsönzők keresésére, pl. kategória, szerző, vagy kölcsönzési státusz alapján.

6. **Modulok és Típusok**: Szervezd az alkalmazást modulokba (pl. `models`, `services`, `utilities`), és használj haladó típusokat (union, intersection, generikusok) az adattípusok rugalmas kezeléséhez.

