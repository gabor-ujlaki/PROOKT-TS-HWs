### Házi Feladat: Egyszerű Webshop Rendszer TypeScript-ben

#### Cél
A feladat célja egy egyszerű, objektumorientált webshop backend rendszer létrehozása TypeScript használatával. A rendszernek képesnek kell lennie termékek kezelésére, rendelések nyilvántartására, és egyszerű felhasználói interakciókra.

#### Követelmények

1. **Termék Osztály (Product Class)**
    - Tulajdonságok: ID (egyedi azonosító, string), név (string), ár (number), leírás (string, opcionális)
    - Metódusok: Konstruktor a termék létrehozásához az összes szükséges információval

2. **Készletkezelő Osztály (Inventory Class)**
    - Tulajdonságok: Termékek listája (Product[] típusú)
    - Metódusok:
        - Termék hozzáadása a készlethez
        - Termék eltávolítása a készletből ID alapján
        - Termék keresése ID vagy név alapján
        - Összes termék listázása

3. **Rendelés Osztály (Order Class)**
    - Tulajdonságok: Rendelési ID (string), Termékek listája (Product[]), Rendelés állapota (enum: Új, Feldolgozás alatt, Kiszállítva)
    - Metódusok:
        - Konstruktor a rendelés létrehozásához a kiválasztott termékekkel
        - Rendelés állapotának frissítése
        - Rendelés összegzése (termékek árainak összege)

4. **Felhasználó Osztály (User Class)**
    - Tulajdonságok: Felhasználói ID (string), Név (string), Email (string)
    - Metódusok:
        - Konstruktor a felhasználói fiók létrehozásához
        - Rendelés leadása (létrehoz egy új Order példányt a kiválasztott termékekkel)

#### Speciális Követelmények

- Minden osztályban használjatok **private** vagy **protected** hozzáférési módosítókat a megfelelő tulajdonságok és metódusok számára, hogy megvédjétek az adatok integritását.
- Az osztályok közötti kommunikáció tiszta és jól definiált legyen. Például, a `User` osztály rendelés leadásánál kommunikáljon az `Inventory` osztállyal a termék elérhetőségének ellenőrzése érdekében.

- Implementáljatok legalább egy **interface**-t vagy **abstract class**-t, ami alapul szolgál az osztályok közötti szerződésnek.

