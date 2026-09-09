import {
    CategoryType,
    CategoryUnion,
    FictionCategory,
    ScienceCategory,
    ChildrenCategory,
    BiographyCategory,
} from './interfaces/IBaseCategory';

export class Category {
    private _details: CategoryUnion;

    private constructor(details: CategoryUnion) {
        this._details = details;
    }

    public static createFiction(genre: string, setting_period: string): Category {
        const details: FictionCategory = {
            type: CategoryType.FICTION,
            genre,
            setting_period,
        };
        return new Category(details);
    }

    public static createScience(field_of_science: string): Category {
        const details: ScienceCategory = {
            type: CategoryType.SCIENCE,
            field_of_science,
        };
        return new Category(details);
    }

    public static createChildren(age_range: string): Category {
        const details: ChildrenCategory = {
            type: CategoryType.CHILDREN,
            age_range,
        };
        return new Category(details);
    }

    public static createBiography(subject_person: string, is_autobiography: boolean): Category {
        const details: BiographyCategory = {
            type: CategoryType.BIOGRAPHY,
            subject_person,
            is_autobiography,
        };
        return new Category(details);
    }

    public get details(): CategoryUnion {
        return this._details;
    }
}
