import 'reflect-metadata';
import custom from '../src/decorators/Decorators';

export default interface LangSwitch {
    languages: ILink[];

    /**
     * Type definition
     * @faker lorem.word
     * @TJS-faker lorem.word
     */
    type: string;
}

export interface ILink {
    path: string;
    label: string;
    external?: boolean;
    icon?: IIcon;
}

export interface IIcon {
    symbol: string;
    size: string;
    dynamicSize?: boolean;
}