### Projekt Feladat: Generikus Todo Lista Kezelő

**Cél:** Egy generikus Todo Lista Kezelő alkalmazás készítése TypeScriptben, amely támogatja a különböző típusú teendők (pl. szöveges feladatok, dátummal ellátott feladatok) kezelését. Az alkalmazásnak lehetővé kell tennie a feladatok hozzáadását, törlését és listázását, valamint támogatnia kell a kategóriák szerinti szűrést.

**Szükséges TypeScript Elemek:**
- **Dekorátorok**: Az alkalmazásban használj dekorátorokat a logolás vagy validáció céljából.(opcionális)
- **Map**: Használj `Map` objektumot a teendők tárolására és kezelésére.
- **Generikusok**: Implementálj generikus osztályokat vagy függvényeket a különböző típusú teendők kezelésére.
- **Modulok**: Szervezd az alkalmazást modulokba az egyes funkciók (pl. hozzáadás, törlés, listázás) elkülönítése érdekében.
- **Haladó Típusok**: Alkalmazz únion típusokat, típus aliasokat, és típusőröket a kód rugalmasságának és biztonságának növelésére.

#### Feladat Leírása:

1. **Generikus Todo Osztály**: Készíts egy generikus `TodoItem<T>` osztályt, ahol `T` a teendő típusát jelenti (pl. `string`, `{ message: string; dueDate: Date }`). Az osztály tartalmazzon egy `id` (egyedi azonosító) és egy `content` (a teendő tartalma) mezőt.

2. **Todo Lista Kezelő**: Implementálj egy `TodoList` osztályt, amely `Map`-et használ a `TodoItem` objektumok tárolására. Az osztály kínáljon metódusokat teendők hozzáadására, törlésére és listázására.

3. **Dekorátorok**: Hozz létre egy egyszerű dekorátort, amely logolja a konzolra, mikor egy teendő hozzáadásra kerül a listához.

4. **Modulok és Namespace-ek**: Szervezd az alkalmazást logikai egységekre (pl. `models`, `services`, `utils`) modulok és namespace-ek segítségével.

5. **Haladó Típusok**: Használj union típusokat a `TodoItem` generikus paraméterének megadására, lehetővé téve többféle teendő típus kezelését. Implementálj típusőröket a teendők típus-specifikus kezeléséhez.

#### Példakód (Generikus TodoItem Osztály):

```typescript
// models/todoItem.ts
export class TodoItem<T> {
  constructor(public id: number, public content: T) {}
}

// services/todoList.ts
import { TodoItem } from "../models/todoItem";

export class TodoList<T> {
  private items: Map<number, TodoItem<T>> = new Map();

  addItem(item: TodoItem<T>): void {
    this.items.set(item.id, item);
    console.log(`Item added: ${item.id}`);
  }

  // További metódusok: deleteItem, listItems, stb.
}
```

