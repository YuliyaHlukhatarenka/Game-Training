export class Opponent {
    private nameValue: string;
    private healthValue: number;

    public constructor() {
        this.healthValue = 20;
    }

    public get name(): string {
        return this.nameValue;
    }

    public set name(value: string) {
        this.nameValue = value;
    }

    public get health(): number {
        return this.healthValue;
    }

    public changeLife(num: number): void {
        this.healthValue = this.healthValue + num;
    }
    public reloadLife(num: number): void {
        this.healthValue = num;
    }
}
