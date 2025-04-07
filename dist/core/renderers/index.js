import { Repository } from "../internals/repository";
const ControlRepository = Repository.create(arg => arg);
const LayoutRepository = Repository.create(arg => arg);
export const getControlRepository = () => ControlRepository;
export const getLayoutRepository = () => LayoutRepository;
