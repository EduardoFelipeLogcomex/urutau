export default interface EventInterface<V> {
  name: string
  payload?: V
}

export class EventUnsubscribe {
  private readonly _name: string
  private readonly _id: string

  constructor(name: string, id: string) {
    this._name = name
    this._id = id
  }

  get name(): string {
    return this._name;
  }

  get id(): string {
    return this._id;
  }
}
