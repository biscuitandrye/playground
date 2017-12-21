class BlockSquare extends BoardSquare {
    
    private value : number = 0;

    public setValue(newVal : number){
        this.value = newVal;
    }

	public  getValue() : number{
        return this.value;
    }

    public isBlank(): boolean  {
        return this.value == 0 || this.value === undefined;
    }
}