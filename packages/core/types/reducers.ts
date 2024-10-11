export type Action<Configuration = object> = {
  type: string;
  payload: unknown;
  configuration: Partial<Configuration>;
};

export type Reducer<IStore, Configuration = object> = (
  state: IStore,
  action: Action<Configuration>
) => IStore;

export type MiddlewareFunction<IStore, Configuration = object> = (
  next: Middleware<IStore, Configuration>
) => Reducer<IStore, Configuration>;

export type MiddlewareObject<IStore, Configuration = object> = Configuration & {
  reducer: (
    next: Middleware<IStore, Configuration>
  ) => Reducer<IStore, Configuration>;
};

export type Middleware<IStore, Configuration = object> =
  | MiddlewareObject<IStore, Configuration>
  | MiddlewareFunction<IStore, Configuration>;

export type Selector<State, T> = (state: State) => T;
