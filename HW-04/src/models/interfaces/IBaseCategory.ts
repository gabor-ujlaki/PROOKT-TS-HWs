export enum CategoryType {
    FICTION = 'fiction',
    SCIENCE = 'science',
    CHILDREN = 'children',
    BIOGRAPHY = 'biography',
}

export interface IBaseCategory {
    readonly type: CategoryType;
}

export interface FictionCategory extends IBaseCategory {
    type: CategoryType.FICTION;
    genre: string;
    setting_period: string;
}

export interface ScienceCategory extends IBaseCategory {
    type: CategoryType.SCIENCE;
    field_of_science: string;
}

export interface ChildrenCategory extends IBaseCategory {
    type: CategoryType.CHILDREN;
    age_range: string;
}

export interface BiographyCategory extends IBaseCategory {
    type: CategoryType.BIOGRAPHY;
    subject_person: string;
    is_autobiography: boolean;
}

export type CategoryUnion =
    | FictionCategory
    | ScienceCategory
    | ChildrenCategory
    | BiographyCategory;
