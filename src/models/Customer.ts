import { Region } from "./Region";

export class Customer {
  constructor(
    public id: string,
    public name: string,
    public region: Region
  ) {}
}
