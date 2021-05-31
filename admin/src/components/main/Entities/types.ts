import { IEntity } from "../../../core/interfaces/IEntities"

export type EntitiesProps = {

}

export type EntitiesState = {
    loading: boolean;
    actualPage: number;
    sizePage: number;
    entities: IEntity[];
    totalResults: number;
    searchWithError: boolean;
}