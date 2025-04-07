import { Repository } from "../internals/repository";

const ControlRepository = Repository.create(arg => arg);
const LayoutRepository = Repository.create(arg => arg);


export const getControlRepository = <T extends any>() => ControlRepository as Repository<Record<string, T>>;
export const getLayoutRepository = <T extends any>() => LayoutRepository as Repository<Record<string, T>>;
