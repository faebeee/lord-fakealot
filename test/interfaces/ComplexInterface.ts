export default interface ComplexInterface {
    type: string;
    
    /**
     * @minimum 2
     * @maximum 2
     */
    items: IItem[];
    
}

export interface IItem {
    name: string;
    
    /**
     * @minimum 0
     * @type integer
     */
    position: number;
}
