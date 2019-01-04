import { Opponent } from './opponent';

export class Player extends Opponent {
   public email: string;

   public constructor(name: string, email: string) {
        super();
        this.email = email;
        this.name = name;
    }
}
