export default interface LangSwitch {
    /**
     * Type definition
     * @faker lorem.paragraph
     */
    type: string;

    /**
     * Type definition
     * @pattern yes|no
     */
    isActive: string;
    
    languages: ILink[];
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
