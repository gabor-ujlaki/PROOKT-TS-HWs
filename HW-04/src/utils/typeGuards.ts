import {
    CategoryUnion,
    FictionCategory,
    ScienceCategory,
    ChildrenCategory,
    BiographyCategory,
    CategoryType,
} from '../models/interfaces/IBaseCategory';

export function isFictionCategory(cat: CategoryUnion): cat is FictionCategory {
    return cat.type === CategoryType.FICTION;
}

export function isScienceCategory(cat: CategoryUnion): cat is ScienceCategory {
    return cat.type === CategoryType.SCIENCE;
}

export function isChildrenCategory(cat: CategoryUnion): cat is ChildrenCategory {
    return cat.type === CategoryType.CHILDREN;
}

export function isBiographyCategory(cat: CategoryUnion): cat is BiographyCategory {
    return cat.type === CategoryType.BIOGRAPHY;
}
