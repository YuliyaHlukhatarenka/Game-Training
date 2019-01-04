import { Opponent } from './opponent';

export class Monster extends Opponent {
    private names: Array<string> = ['Том', 'Макс', 'Дима'];
    private secondNames: Array<string> = ['ужасный', 'злобный', 'сопливый'];
    private thirdNames: Array<string> = ['Огр', 'Гном', 'Гоблин'];

    public constructor() {
        super();
        this.name = this.getRandomName(this.names) + ' ' +
            this.getRandomName(this.secondNames) + ' ' +
            this.getRandomName(this.thirdNames);
    }

    public get getName(): string {
        return this.name;
    }

    private getRandomName(arr: string[]): string {
        const i = Math.floor(Math.random() * Math.floor(arr.length));
        return arr[i];
    }
}
